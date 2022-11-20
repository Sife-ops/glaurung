import { Row } from "../../model/database";
import { builder } from "../builder";

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
