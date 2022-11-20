import { Row } from "../../model/database";
import { ServiceType } from "./service";
import { builder } from "../builder";
import { mapDataToIds } from "./common";

export const TagType = builder.objectRef<Row["tag"]>("Tag");
TagType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),

    services: t.loadableList({
      type: ServiceType,
      resolve: (parent) => parent.id,
      load: (ids, ctx) =>
        ctx.db
          .selectFrom("serviceTag")
          .where("tagId", "in", ids)
          .innerJoin("service", "service.id", "serviceTag.serviceId")
          .selectAll()
          .execute()
          .then(mapDataToIds(ids, "tagId")),
    }),
  }),
});
