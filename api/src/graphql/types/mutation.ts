import { builder } from "../builder";

builder.mutationFields((t) => ({
  hello: t.string({
    resolve: async (_, __, ctx) => {
      const a = await ctx.db.selectFrom("user").selectAll().execute();
      // await ctx.db
      //   .insertInto("user")
      //   .values({
      //     password: 'pass',
      //     username: 'user'
      //   })
      //   .executeTakeFirst();
      return "hello" + JSON.stringify(a);
    },
  }),
}));
