import { Row } from "../../model/database";
import { builder } from "../builder";
import { ProfileType } from "./profile";

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
      load: async (keys, ctx) =>
        ctx.db
          .selectFrom("serviceField")
          .where("serviceId", "in", keys)
          .selectAll()
          .execute()
          .then((data) => {
            ctx.fileLogger(__filename)("info", { resolved: data });
            return data;
          })
          .then((data) =>
            keys.map((key) =>
              data.filter((service) => service.serviceId === key)
            )
          ),
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

        ctx.fileLogger(__filename)("info", { resolved: serviceTags });

        return keys.map((serviceId) =>
          serviceTags.filter((serviceTag) => serviceTag.serviceId === serviceId)
        );
      },
    }),

    profiles: t.loadableList({
      type: ProfileType,
      resolve: (parent) => parent.id,
      load: async (keys, ctx) => {
        const serviceProfiles = await ctx.db
          .selectFrom("profile")
          .where("serviceId", "in", keys)
          .selectAll()
          .execute();

        ctx.fileLogger(__filename)("info", { resolved: serviceProfiles });

        return keys.map((serviceId) =>
          serviceProfiles.filter(
            (serviceProfile) => serviceProfile.serviceId === serviceId
          )
        );
      },
    }),
  }),
});
