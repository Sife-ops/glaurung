import { Generated } from "kysely";

export interface User {
  id: Generated<number>;
  username: string;
  password: string;
}
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
  userId: number;
  title: string;
}

export interface Profile {
  id: Generated<number>;
  serviceId: number;
  title: string;
}

export interface ProfileField {
  id: Generated<number>;
  profileId: number;
  key: string;
  value: string;
}
