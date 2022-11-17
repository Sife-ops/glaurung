import { Generated } from "kysely";

export { UserTable } from "./user";

export interface ServiceTable {
  id: Generated<number>;
  userId: number;
}

export interface ServiceFieldTable {
  id: Generated<number>;
  serviceId: number;
  key: string;
  // todo: type
  value: string;
}
