import { builder } from "../builder";
import { TagType } from "./tag";

builder.mutationFields((t) => ({
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
