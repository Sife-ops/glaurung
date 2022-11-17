import { Generated } from "kysely";

export interface UserTable {
  id: Generated<number>;
  username: string;
  password: string;
}