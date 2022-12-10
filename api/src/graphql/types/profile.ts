import { Row } from "../../model/database";
import { builder } from "../builder";
import { mapDataToIds } from "./common";
import { ProfileFieldType } from "./field";

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
