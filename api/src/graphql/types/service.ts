import { Row } from "../../model/database";
import { builder } from "../builder";

export const ServiceFieldType =
  builder.objectRef<Row["serviceField"]>("ServiceField");
ServiceFieldType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    serviceId: t.exposeInt("serviceId"),
    key: t.exposeString("key"),
    value: t.exposeString("value"),
  }),
});

export const ServiceType = builder.objectRef<Row["service"]>("Service");
ServiceType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    userId: t.exposeInt("userId"),

    // todo: dataloader
    fields: t.field({
      type: [ServiceFieldType],
      resolve: async (_, __, ctx) => {
        const res = await ctx.db
          .selectFrom("serviceField")
          .selectAll()
          .execute();

        console.log(
          JSON.stringify({
            ctx: { user: ctx.user },
            entity: { resolved: res },
            module: {
              filename: __filename,
            },
          })
        );

        return res;
      },
    }),
  }),
});
