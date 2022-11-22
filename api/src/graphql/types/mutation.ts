import lodash from "lodash";
import { ServiceType } from "./service";
import { TagType } from "./tag";
import { builder } from "../builder";

// todo: return alphabetical
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
      // todo: cache update
      ctx.db
        .deleteFrom("tag") //
        .where("tag.id", "=", args.tagId)
        .returningAll()
        .executeTakeFirstOrThrow(),
  }),

  //////////////////////////////////////////////////////////////////////////////
  // todo: serviceTag //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // service ///////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

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
      // todo: cache update
      ctx.db
        .deleteFrom("service") //
        .where("service.id", "=", args.serviceId)
        .returningAll()
        .executeTakeFirstOrThrow(),
  }),
}));
