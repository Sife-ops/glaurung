import { Row } from "../../model/database";
import { builder } from "../builder";

export const CreateFieldInputType = builder.inputType("CreateFieldInput", {
  fields: (t) => ({
    key: t.string({ required: true }),
    value: t.string({ required: true }),
    type: t.string({ required: true }),
  }),
});

export const defaultToUndefined = <T>(i: T) => {
  let o = {};
  for (const key in i) {
    o = {
      ...o,
      [key]: i[key] || undefined,
    };
  }
  return o;
};

export const UpdateFieldInputType = builder.inputType("UpdateFieldInput", {
  fields: (t) => ({
    key: t.string({ required: false }),
    value: t.string({ required: false }),
    type: t.string({ required: false }),
  }),
});

export const ProfileFieldType =
  builder.objectRef<Row["profileField"]>("ProfileField");
ProfileFieldType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    profileId: t.exposeInt("profileId"),
    key: t.exposeString("key"),
    value: t.exposeString("value"),
    type: t.exposeString("type"),
  }),
});

export const ServiceFieldType =
  builder.objectRef<Row["serviceField"]>("ServiceField");
ServiceFieldType.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    serviceId: t.exposeInt("serviceId"),
    key: t.exposeString("key"),
    value: t.exposeString("value"),
    type: t.exposeString("type"),
  }),
});
