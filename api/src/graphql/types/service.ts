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

export const TagType = builder.objectRef<Row["tag"]>("Tag");
TagType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
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

        return keys.map((serviceId) =>
          serviceFields.filter(
            (serviceField) => serviceField.serviceId === serviceId
          )
        );
      },
    }),

    tags: t.loadableList({
      type: TagType,
      resolve: (parent) => parent.id,
      load: async (keys, ctx) => {
        const serviceTags = await ctx.db
          .selectFrom("serviceTag")
          .innerJoin("tag", "tag.id", "serviceTag.tagId")
          .where("serviceId", "in", keys)
          .selectAll()
          .execute();

        return keys.map((serviceId) =>
          serviceTags.filter(
            (serviceTag) => serviceTag.serviceId === serviceId
          )
        );
      },
    }),
  }),
});

// // todo: abstract logging
// console.debug(
//   JSON.stringify({
//     timestamp: new Date().toISOString(),
//     level: "debug",
//     ctx: { user: ctx.user },
//     entity: { resolved: mapped },
//     module: { filename: __filename },
//   })
// );
