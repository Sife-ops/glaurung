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
    title: t.exposeString("title"),

    fields: t.loadableList({
      type: ServiceFieldType,
      resolve: (parent) => parent.id,
      load: async (keys, ctx) => {
        const serviceFields = await ctx.db
          .selectFrom("serviceField")
          .where("serviceId", "in", keys)
          .selectAll()
          .execute();

        const mapped = keys.map((serviceId) =>
          serviceFields.filter(
            (serviceField) => serviceField.serviceId === serviceId
          )
        );

        // todo: abstraction
        console.debug(
          JSON.stringify({
            timestamp: new Date().toISOString(),
            level: "debug",
            ctx: { user: ctx.user },
            entity: { resolved: mapped },
            module: { filename: __filename },
          })
        );

        return mapped;
      },
    }),
  }),
});
