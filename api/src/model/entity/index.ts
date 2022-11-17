import { Generated } from "kysely";

export { UserTable } from "./user";

export interface ServiceTable {
  id: Generated<number>;
  userId: number;
}

export interface ServiceFieldTable {
  id: Generated<number>;
  serviceId: number;
  key: number;
  // todo: type
  value: number;
}
