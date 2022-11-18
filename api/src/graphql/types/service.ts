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

export const ProfileFieldType =
  builder.objectRef<Row["profileField"]>("ProfileField");
ProfileFieldType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    profileId: t.exposeInt("profileId"),
    key: t.exposeString("key"),
    value: t.exposeString("value"),
  }),
});

export const ProfileType = builder.objectRef<Row["profile"]>("Profile");
ProfileType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    userId: t.exposeInt("userId"),
    title: t.exposeString("title"),

    fields: t.loadableList({
      type: ProfileFieldType,
      resolve: (parent) => parent.id,
      load: async (keys, ctx) => {
        const profileFields = await ctx.db
          .selectFrom("profileField")
          .where("profileId", "in", keys)
          .selectAll()
          .execute();

        // todo: get info from resolve
        ctx.fileLogger(__filename)("info", { resolved: profileFields });

        return keys.map((profileId) =>
          profileFields.filter(
            (profileField) => profileField.profileId === profileId
          )
        );
      },
    }),
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

        ctx.fileLogger(__filename)("info", { resolved: serviceFields });

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
