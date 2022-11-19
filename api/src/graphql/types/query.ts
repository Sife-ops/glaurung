import { __Directive, __Type } from "graphql";
import { builder } from "../builder";
import { ServiceType } from "./service";

builder.queryFields((t) => ({
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

  services: t.field({
    type: [ServiceType],
    resolve: (_, __, ctx, info) =>
      ctx
        .userSelectFrom("service")
        .selectAll()
        .execute()
        .then((data) => {
          ctx.fileLogger(__filename)(
            "info",
            { resolved: data },
            { path: info.path }
          );
          return data;
        }),
  }),
}));
