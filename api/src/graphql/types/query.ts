import { ProfileType } from "./profile";
import { ServiceType } from "./service";
import { builder } from "../builder";

builder.queryFields((t) => ({
  services: t.field({
    type: [ServiceType],
    resolve: (_, __, ctx) =>
      ctx.userSelectFrom("service").selectAll().execute(),
  }),

  profiles: t.field({
    type: [ProfileType],
    resolve: (_, __, ctx) =>
      ctx.userSelectFrom("profile").selectAll().execute(),
  }),
}));
