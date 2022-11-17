import { Row } from "../../model/database";
import { builder } from "../builder";

export const UserType = builder.objectRef<Row["user"]>("User");
UserType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    username: t.exposeID("username"),
  }),
});
