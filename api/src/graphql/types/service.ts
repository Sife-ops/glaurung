import { Row } from "../../model/database";
import { builder } from "../builder";

export const ServiceFieldType =
  builder.objectRef<Row["serviceField"]>("ServiceField");
ServiceFieldType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    serviceId: t.exposeID("serviceId"),
    key: t.exposeID("key"),
    value: t.exposeID("value"),
  }),
});

export const ServiceType = builder.objectRef<Row["service"]>("Service");
ServiceType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    userId: t.exposeID("userId"),

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
