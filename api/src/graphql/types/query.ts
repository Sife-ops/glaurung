import { ProfileType } from "./profile";
import { ServiceType } from "./service";
import { builder } from "../builder";

builder.queryFields((t) => ({
  services: t.field({
    type: [ServiceType],
    resolve: (_, __, ctx) =>
      ctx
        .selectUserServices()
        .select(["service.id as id", "userId", "title"])
        .execute(),
  }),

  profiles: t.field({
    type: [ProfileType],
    resolve: (_, __, ctx) =>
      ctx
        .selectUserServices()
        .innerJoin("profile", "profile.serviceId", "service.id")
        .select(["profile.id as id", "serviceId", "title"])
        .execute(),
  }),
}));
