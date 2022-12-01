import Fuse from "fuse.js";
import lodash from "lodash";
import { ProfileFieldType, ProfileType } from "./profile";
import { ServiceFieldType, ServiceType } from "./service";
import { TagType } from "./tag";
import { builder } from "../builder";
import { compareSync, hashSync } from "bcryptjs";
import { faker } from "@faker-js/faker";
import { sign } from "jsonwebtoken";

const accessTokenSecret = process.env.GLAURUNG_ACCESS_TOKEN_SECRET || "local";

// todo: return alphabetical
builder.mutationFields((t) => ({
  //////////////////////////////////////////////////////////////////////////////
  // user //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  signIn: t.string({
    args: {
      username: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const user = await ctx.db
        .selectFrom("user")
        .where("user.username", "=", args.username)
        .selectAll()
        .executeTakeFirstOrThrow();
      if (!compareSync(args.password, user.password)) {
        throw new Error("incorrect password");
      }
      return sign({ id: user.id, username: user.username }, accessTokenSecret, {
        // todo: token options
        expiresIn: "7d",
      });
    },
  }),

  changePassword: t.boolean({
    args: {
      password: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      await ctx.db
        .updateTable("user")
        .set({ password: hashSync(args.password) })
        .where("user.id", "=", ctx.user.id)
        .execute();
      return true;
    },
  }),

  //////////////////////////////////////////////////////////////////////////////
  // tag ///////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  createTag: t.field({
    type: TagType,
    args: {
      title: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const found = await ctx.db
        .selectFrom("tag")
        .where("tag.userId", "=", ctx.user.id)
        .where("tag.title", "=", args.title)
        .selectAll()
        .executeTakeFirst();
      if (found) throw new Error("duplicate tag title");
      return await ctx.db
        .insertInto("tag")
        .values({ title: args.title, userId: ctx.user.id })
        .returningAll()
        .executeTakeFirstOrThrow();
    },
  }),

  updateTag: t.field({
    type: TagType,
    args: {
      tagId: t.arg.int({ required: true }),
      title: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) =>
      ctx.db
        .updateTable("tag")
        .set({ title: args.title })
        .where("tag.id", "=", args.tagId)
        .returningAll()
        .executeTakeFirstOrThrow(),
  }),

  deleteTag: t.field({
    type: TagType,
    args: {
      tagId: t.arg.int({ required: true }),
    },
    resolve: async (_, args, ctx) =>
      ctx.db
        .deleteFrom("tag") //
        .where("tag.id", "=", args.tagId)
        .returningAll()
        .executeTakeFirstOrThrow(),
  }),

  //////////////////////////////////////////////////////////////////////////////
  // serviceTag ////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  updateServiceTags: t.field({
    type: ServiceType,
    args: {
      serviceId: t.arg.int({ required: true }),
      tags: t.arg.stringList({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      await ctx.db
        .deleteFrom("serviceTag")
        .where("serviceTag.serviceId", "=", args.serviceId)
        .execute();

      if (args.tags.length > 0) {
        for (const tag of args.tags) {
          try {
            const { id } = await ctx.db
              .selectFrom("tag")
              .where("tag.userId", "=", ctx.user.id)
              .where("tag.title", "=", tag)
              .selectAll()
              .executeTakeFirstOrThrow();

            await ctx.db
              .insertInto("serviceTag")
              .values({ serviceId: args.serviceId, tagId: id })
              .execute();
          } catch {
            continue;
          }
        }
      }

      return await ctx.db
        .selectFrom("service")
        .where("service.id", "=", args.serviceId)
        .selectAll()
        .executeTakeFirstOrThrow();
    },
  }),

  //////////////////////////////////////////////////////////////////////////////
  // service ///////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // todo: move to query
  search: t.field({
    type: [ServiceType],
    args: {
      keys: t.arg.stringList({ required: true, defaultValue: ["title"] }),
      pattern: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const list = await ctx.db
        .selectFrom("service")
        .where("service.userId", "=", ctx.user.id)
        .fullJoin("serviceField", "serviceField.serviceId", "service.id")
        .fullJoin("serviceTag", "serviceTag.serviceId", "service.id")
        .fullJoin("tag", "tag.id", "serviceTag.tagId")
        .fullJoin("profile", "profile.serviceId", "service.id")
        .fullJoin("profileField", "profileField.profileId", "profile.id")
        .select([
          "service.id as id",
          "service.userId as userId",
          "service.title as title",

          "service.title as serviceTitle",
          "serviceField.key as serviceFieldKey",
          "serviceField.value as serviceFieldValue",

          "profile.title as profileTitle",
          "profileField.key as profileFieldKey",
          "profileField.value as profileFieldValue",

          "tag.title as tagTitle",
        ])
        .execute();

      const result = new Fuse(list, {
        includeScore: true,
        keys: args.keys,
      }).search(args.pattern);
      // console.log("result", result); // todo: remove logging

      const unique = lodash.uniqBy(result, (o) => o.item.id);
      // console.log("unique", unique);

      return unique.map((e) => ({ ...e.item })) as {
        id: number;
        userId: number;
        title: string;
      }[];
    },
  }),

  // todo: move to query
  servicesWithTags: t.field({
    type: [ServiceType],
    args: {
      tags: t.arg.stringList({ required: true, defaultValue: [] }),
      mode: t.arg.string({ required: true, defaultValue: "and" }), // todo: literal
    },
    resolve: async (_, args, ctx) => {
      let builder = ctx.db
        .selectFrom("service")
        .where("userId", "=", ctx.user.id);
      if (args.tags.length > 0) {
        const tags = await ctx.db // todo: use single query
          .selectFrom("tag")
          .where("tag.userId", "=", ctx.user.id)
          .where("tag.title", "in", args.tags)
          .selectAll()
          .execute();
        const tagIds = tags.map((tag) => tag.id);
        const services = await builder
          .innerJoin("serviceTag", "serviceTag.serviceId", "service.id")
          .where("serviceTag.tagId", "in", tagIds)
          .select(["service.id as id", "tagId", "userId", "title"])
          .execute();
        const groups = lodash.groupBy(services, (e) => e.id);
        let servicesWithTags = Object.keys(groups).map(
          (groupKey) => groups[groupKey]
        );
        if (args.mode === "and") {
          servicesWithTags = servicesWithTags.filter((group) =>
            tagIds.every((tagId) =>
              group.find((service) => service.tagId === tagId)
            )
          );
        }
        return servicesWithTags.map((group) => group[0]);
      } else {
        return await builder.selectAll().execute();
      }
    },
  }),

  createService: t.field({
    type: ServiceType,
    args: {
      title: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const found = await ctx.db
        .selectFrom("service")
        .where("service.userId", "=", ctx.user.id)
        .where("service.title", "=", args.title)
        .selectAll()
        .executeTakeFirst();
      if (found) throw new Error("duplicate service title");
      return await ctx.db
        .insertInto("service")
        .values({ title: args.title, userId: ctx.user.id })
        .returningAll()
        .executeTakeFirstOrThrow();
    },
  }),

  updateService: t.field({
    type: ServiceType,
    args: {
      serviceId: t.arg.int({ required: true }),
      title: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) =>
      ctx.db
        .updateTable("service")
        .set({ title: args.title })
        .where("service.id", "=", args.serviceId)
        .returningAll()
        .executeTakeFirstOrThrow(),
  }),

  deleteService: t.field({
    type: ServiceType,
    args: {
      serviceId: t.arg.int({ required: true }),
    },
    resolve: async (_, args, ctx) =>
      ctx.db
        .deleteFrom("service") //
        .where("service.id", "=", args.serviceId)
        .returningAll()
        .executeTakeFirstOrThrow(),
  }),

  //////////////////////////////////////////////////////////////////////////////
  // serviceField //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  createServiceField: t.field({
    // todo: use service field type
    type: ServiceFieldType,
    args: {
      serviceId: t.arg.int({ required: true }),
      key: t.arg.string({ required: true }),
      value: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const found = await ctx.db
        .selectFrom("serviceField")
        .where("serviceField.serviceId", "=", args.serviceId)
        .where("serviceField.key", "=", args.key)
        .selectAll()
        .executeTakeFirst();
      if (found) throw new Error("duplicate serviceField key");
      return await ctx.db
        .insertInto("serviceField")
        .values({
          serviceId: args.serviceId,
          key: args.key,
          value: args.value,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    },
  }),

  updateServiceField: t.field({
    type: ServiceFieldType,
    args: {
      serviceFieldId: t.arg.int({ required: true }),
      key: t.arg.string({ required: true }),
      value: t.arg.string({ required: true }),
    },
    resolve: (_, args, ctx) =>
      ctx.db
        .updateTable("serviceField")
        .set({ key: args.key, value: args.value })
        .where("serviceField.id", "=", args.serviceFieldId)
        .returningAll()
        .executeTakeFirstOrThrow(),
  }),

  deleteServiceField: t.field({
    type: ServiceFieldType,
    args: {
      serviceFieldId: t.arg.int({ required: true }),
    },
    resolve: async (_, args, ctx) =>
      ctx.db
        .deleteFrom("serviceField")
        .where("serviceField.id", "=", args.serviceFieldId)
        .returningAll()
        .executeTakeFirstOrThrow(),
  }),

  //////////////////////////////////////////////////////////////////////////////
  // profile ///////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  createProfile: t.field({
    type: ProfileType,
    args: {
      serviceId: t.arg.int({ required: true }),
      title: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const found = await ctx.db
        .selectFrom("profile")
        .where("profile.serviceId", "=", args.serviceId)
        .where("profile.title", "=", args.title)
        .selectAll()
        .executeTakeFirst();
      if (found) throw new Error("duplicate profile title");
      return await ctx.db
        .insertInto("profile")
        .values({ title: args.title, serviceId: args.serviceId })
        .returningAll()
        .executeTakeFirstOrThrow();
    },
  }),

  updateProfile: t.field({
    type: ProfileType,
    args: {
      profileId: t.arg.int({ required: true }),
      title: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) =>
      ctx.db
        .updateTable("profile")
        .set({ title: args.title })
        .where("profile.id", "=", args.profileId)
        .returningAll()
        .executeTakeFirstOrThrow(),
  }),

  deleteProfile: t.field({
    type: ProfileType,
    args: {
      profileId: t.arg.int({ required: true }),
    },
    resolve: async (_, args, ctx) =>
      ctx.db
        .deleteFrom("profile") //
        .where("profile.id", "=", args.profileId)
        .returningAll()
        .executeTakeFirstOrThrow(),
  }),

  //////////////////////////////////////////////////////////////////////////////
  // profileField //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  createProfileField: t.field({
    type: ProfileFieldType,
    args: {
      profileId: t.arg.int({ required: true }),
      key: t.arg.string({ required: true }),
      value: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const found = await ctx.db
        .selectFrom("profileField")
        .where("profileField.profileId", "=", args.profileId)
        .where("profileField.key", "=", args.key)
        .selectAll()
        .executeTakeFirst();
      if (found) throw new Error("duplicate profileField key");
      let value: string = "";
      if (args.key === "password" && !args.value) {
        value = faker.internet.password(16);
      } else {
        value = args.value;
      }
      return await ctx.db
        .insertInto("profileField")
        .values({
          profileId: args.profileId,
          key: args.key,
          value,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    },
  }),

  updateProfileField: t.field({
    type: ProfileFieldType,
    args: {
      profileFieldId: t.arg.int({ required: true }),
      key: t.arg.string({ required: true }),
      value: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) =>
      ctx.db
        .updateTable("profileField")
        .set({ key: args.key, value: args.value })
        .where("profileField.id", "=", args.profileFieldId)
        .returningAll()
        .executeTakeFirstOrThrow(),
  }),

  deleteProfileField: t.field({
    type: ProfileFieldType,
    args: {
      profileFieldId: t.arg.int({ required: true }),
    },
    resolve: async (_, args, ctx) =>
      ctx.db
        .deleteFrom("profileField") //
        .where("profileField.id", "=", args.profileFieldId)
        .returningAll()
        .executeTakeFirstOrThrow(),
  }),

  //////////////////////////////////////////////////////////////////////////////
  // other /////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  import: t.string({
    args: {
      json: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      // todo: zod
      // todo: too much any
      const { items } = JSON.parse(args.json);
      const logins = items.filter((e: any) => e.type === 1);

      let skipped: any[] = [];

      for (const login of logins) {
        console.log("importing", login);

        // skip if missing username and/or password
        const { username, password } = login.login;
        if (!username || !password) {
          skipped = [
            ...skipped,
            {
              item: login,
              failure: {
                reason: "missing username and/or password",
              },
            },
          ];
          continue;
        }

        // skip duplicate services
        const found = await ctx.db
          .selectFrom("service")
          .where("service.title", "=", login.name)
          .selectAll()
          .execute();
        if (found.length > 0) {
          const service = found[0];
          const profile = await ctx.db
            .insertInto("profile")
            .values({
              serviceId: service.id,
              title: `alt-${found.length}`,
            })
            .returningAll()
            .executeTakeFirstOrThrow();

          await ctx.db
            .insertInto("profileField")
            .values({
              profileId: profile.id,
              key: "username",
              value: username,
            })
            .execute();

          await ctx.db
            .insertInto("profileField")
            .values({
              profileId: profile.id,
              key: "password",
              value: password,
            })
            .execute();

          continue;
        }

        ////////////////////////////////////////////////////////////////////////

        const service = await ctx.db
          .insertInto("service")
          .values({
            title: login.name,
            userId: ctx.user.id,
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        const url = login.login?.uris?.find(
          (e: any) => typeof e.uri === "string"
        );
        if (url) {
          await ctx.db
            .insertInto("serviceField")
            .values({
              serviceId: service.id,
              key: "url",
              value: url.uri,
            })
            .execute();
        }

        if (login.notes) {
          await ctx.db
            .insertInto("serviceField")
            .values({
              serviceId: service.id,
              key: "notes",
              value: login.notes,
            })
            .execute();
        }

        const profile = await ctx.db
          .insertInto("profile")
          .values({
            serviceId: service.id,
            title: "main",
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        await ctx.db
          .insertInto("profileField")
          .values({
            profileId: profile.id,
            key: "username",
            value: username,
          })
          .execute();

        await ctx.db
          .insertInto("profileField")
          .values({
            profileId: profile.id,
            key: "password",
            value: password,
          })
          .execute();
      }

      return JSON.stringify(skipped);
    },
  }),
}));
