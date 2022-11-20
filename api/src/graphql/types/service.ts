import { ProfileType } from "./profile";
import { Row } from "../../model/database";
import { TagType } from "./tag";
import { builder } from "../builder";
import { mapDataToIds } from "./common";

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
      load: (ids, ctx) =>
        ctx.db
          .selectFrom("serviceField")
          .where("serviceId", "in", ids)
          .selectAll()
          .execute()
          .then(mapDataToIds(ids, "serviceId")),
    }),

    tags: t.loadableList({
      type: TagType,
      resolve: (parent) => parent.id,
      load: (ids, ctx) =>
        ctx.db
          .selectFrom("serviceTag")
          .innerJoin("tag", "tag.id", "serviceTag.tagId")
          .where("serviceId", "in", ids)
          .selectAll()
          .execute()
          .then(mapDataToIds(ids, "serviceId")),
    }),

    profiles: t.loadableList({
      type: ProfileType,
      resolve: (parent) => parent.id,
      load: (ids, ctx) =>
        ctx.db
          .selectFrom("profile")
          .where("serviceId", "in", ids)
          .selectAll()
          .execute()
          .then(mapDataToIds(ids, "serviceId")),
    }),
  }),
});
