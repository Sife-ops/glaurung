import { ProfileType } from "./profile";
import { ServiceType } from "./service";
import { builder } from "../builder";
import { TagType } from "./tag";

builder.queryFields((t) => ({
  services: t.field({
    type: [ServiceType],
    resolve: (_, __, ctx) =>
      ctx.db
        .selectFrom("service")
        .where("service.userId", "=", ctx.user.id)
        .selectAll()
        .execute(),
  }),

  tags: t.field({
    type: [TagType],
    resolve: (_, __, ctx) =>
      ctx.db
        .selectFrom("tag")
        .where("tag.userId", "=", ctx.user.id)
        .selectAll()
        .execute(),
  }),

  profiles: t.field({
    type: [ProfileType],
    resolve: (_, __, ctx) =>
      ctx.db
        .selectFrom("service")
        .where("service.userId", "=", ctx.user.id)
        .innerJoin("profile", "profile.serviceId", "service.id")
        .select(["profile.id as id", "serviceId", "title"])
        .execute(),
  }),
}));
