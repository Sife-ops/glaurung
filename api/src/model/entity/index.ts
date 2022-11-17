import { Generated } from "kysely";

export { UserTable } from "./user";

export interface ServiceTable {
  id: Generated<number>;
  userId: number;
}
