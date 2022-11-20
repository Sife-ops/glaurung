import { Row } from "../../model/database";
import { builder } from "../builder";
import { mapDataToIds } from "./common";

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
    title: t.exposeString("title"),

    fields: t.loadableList({
      type: ProfileFieldType,
      resolve: (parent) => parent.id,
      load: (ids, ctx) =>
        ctx.db
          .selectFrom("profileField")
          .where("profileId", "in", ids)
          .selectAll()
          .execute()
          .then(mapDataToIds(ids, "profileId")),
    }),
  }),
});
