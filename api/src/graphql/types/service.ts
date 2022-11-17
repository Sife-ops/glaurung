import { Row } from "../../model/database";
import { builder } from "../builder";

export const ServiceType = builder.objectRef<Row["service"]>("Service");
ServiceType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    userId: t.exposeID("userId"),
  }),
});
