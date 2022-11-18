import { Generated } from "kysely";

export { User } from "./user";

export interface Service {
  // todo: uuid for ids
  id: Generated<number>;
  userId: number;
  title: string;
}

export interface ServiceField {
  id: Generated<number>;
  serviceId: number;
  key: string;
  // todo: type
  value: string;
}

export interface ServiceTag {
  id: Generated<number>;
  serviceId: number;
  tagId: number;
}

export interface Tag {
  id: Generated<number>;
  title: string;
}

export interface Profile {
  id: Generated<number>;
  userId: number;
  serviceId: number;
  title: string;
}

export interface ProfileField {
  id: Generated<number>;
  profileId: number;
  key: string;
  value: string;
}
