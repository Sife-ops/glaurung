import { builder } from "../builder";

builder.queryFields((t) => ({
  hello: t.string({
    resolve: async (_, __, ctx) => {
      const a = await ctx.db.selectFrom("user").selectAll().execute();
      return "hello" + JSON.stringify(a);
    },
  }),
}));
