import lodash from "lodash";
import { ProfileType } from "./profile";
import { ServiceType } from "./service";
import { TagType } from "./tag";
import { builder } from "../builder";
import { compareSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { faker } from "@faker-js/faker";

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
      tagIds: t.arg.intList({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      await ctx.db
        .deleteFrom("serviceTag")
        .where("serviceTag.serviceId", "=", args.serviceId)
        .execute();

      if (args.tagIds.length > 0) {
        for (const tagId of args.tagIds) {
          await ctx.db
            .insertInto("serviceTag")
            .values({ serviceId: args.serviceId, tagId })
            .execute();
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

  servicesWithTags: t.field({
    type: [ServiceType],
    args: {
      tagIds: t.arg.intList({ required: true, defaultValue: [] }), // todo: allow tag titles
      mode: t.arg.string({ required: true, defaultValue: "and" }), // todo: literal
    },
    resolve: async (_, args, ctx) => {
      let builder = ctx.db
        .selectFrom("service")
        .where("userId", "=", ctx.user.id);
      if (args.tagIds.length > 0) {
        const services = await builder
          .innerJoin("serviceTag", "serviceTag.serviceId", "service.id")
          .where("serviceTag.tagId", "in", args.tagIds)
          .select(["service.id as id", "tagId", "userId", "title"])
          .execute();
        const groups = lodash.groupBy(services, (e) => e.id);
        let servicesWithTags = Object.keys(groups).map(
          (groupKey) => groups[groupKey]
        );
        if (args.mode === "and") {
          servicesWithTags = servicesWithTags.filter((group) =>
            args.tagIds.every((tagId) =>
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
    type: ServiceType,
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
      await ctx.db
        .insertInto("serviceField")
        .values({
          serviceId: args.serviceId,
          key: args.key,
          value: args.value,
        })
        .execute();
      return await ctx.db
        .selectFrom("service")
        .where("service.id", "=", args.serviceId)
        .selectAll()
        .executeTakeFirstOrThrow();
    },
  }),

  updateServiceField: t.field({
    type: ServiceType,
    args: {
      serviceFieldId: t.arg.int({ required: true }),
      key: t.arg.string({ required: true }),
      value: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const updated = await ctx.db
        .updateTable("serviceField")
        .set({ key: args.key, value: args.value })
        .where("serviceField.id", "=", args.serviceFieldId)
        .returningAll()
        .executeTakeFirstOrThrow();
      return await ctx.db
        .selectFrom("service")
        .where("service.id", "=", updated.serviceId)
        .selectAll()
        .executeTakeFirstOrThrow();
    },
  }),

  deleteServiceField: t.field({
    type: ServiceType,
    args: {
      serviceFieldId: t.arg.int({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const deleted = await ctx.db
        .deleteFrom("serviceField") //
        .where("serviceField.id", "=", args.serviceFieldId)
        .returningAll()
        .executeTakeFirstOrThrow();

      return await ctx.db
        .selectFrom("service")
        .where("service.id", "=", deleted.id)
        .selectAll()
        .executeTakeFirstOrThrow();
    },
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
    type: ProfileType,
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
      await ctx.db
        .insertInto("profileField")
        .values({
          profileId: args.profileId,
          key: args.key,
          value,
        })
        .execute();
      return await ctx.db
        .selectFrom("profile")
        .where("profile.id", "=", args.profileId)
        .selectAll()
        .executeTakeFirstOrThrow();
    },
  }),

  updateProfileField: t.field({
    type: ProfileType,
    args: {
      profileFieldId: t.arg.int({ required: true }),
      key: t.arg.string({ required: true }),
      value: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const updated = await ctx.db
        .updateTable("profileField")
        .set({ key: args.key, value: args.value })
        .where("profileField.id", "=", args.profileFieldId)
        .returningAll()
        .executeTakeFirstOrThrow();
      return await ctx.db
        .selectFrom("profile")
        .where("profile.id", "=", updated.profileId)
        .selectAll()
        .executeTakeFirstOrThrow();
    },
  }),

  deleteProfileField: t.field({
    type: ProfileType,
    args: {
      profileFieldId: t.arg.int({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const deleted = await ctx.db
        .deleteFrom("profileField") //
        .where("profileField.id", "=", args.profileFieldId)
        .returningAll()
        .executeTakeFirstOrThrow();
      return await ctx.db
        .selectFrom("profile")
        .where("profile.id", "=", deleted.id)
        .selectAll()
        .executeTakeFirstOrThrow();
    },
  }),
}));
