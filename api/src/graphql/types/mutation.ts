import lodash from "lodash";
import { ServiceType } from "./service";
import { TagType } from "./tag";
import { builder } from "../builder";

builder.mutationFields((t) => ({
  servicesWithTags: t.field({
    type: [ServiceType],
    args: {
      tagIds: t.arg.intList({ required: true, defaultValue: [] }),
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
        let servicesWithTags = [];
        // todo: object.keys, filter/map
        for (const groupKey in groups) {
          const group = groups[groupKey];
          if (args.mode === "and") {
            const hasAllTags = args.tagIds.every((tagId) =>
              group.find((service) => service.tagId === tagId)
            );
            if (hasAllTags) {
              servicesWithTags.push(group[0]);
            }
          } else {
            servicesWithTags.push(group[0]);
          }
        }
        return servicesWithTags;
      } else {
        return await builder.selectAll().execute();
      }
    },
  }),

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
      if (found) throw new Error("tag exists");
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
      id: t.arg.int({ required: true }),
      title: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      await ctx.db
        .updateTable("tag")
        .set({ title: args.title })
        .where("tag.id", "=", args.id)
        .executeTakeFirst();
      return await ctx.db
        .selectFrom("tag")
        .where("tag.id", "=", args.id)
        .selectAll()
        .executeTakeFirstOrThrow();
    },
  }),

  deleteTag: t.field({
    type: TagType,
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const deleted = await ctx.db
        .selectFrom("tag")
        .where("tag.id", "=", args.id)
        .selectAll()
        .executeTakeFirstOrThrow();
      await ctx.db
        .deleteFrom("tag") //
        .where("tag.id", "=", args.id)
        .execute();
      return deleted; // todo: cache update
    },
  }),
}));
