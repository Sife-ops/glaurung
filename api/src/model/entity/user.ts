import { Generated } from "kysely";

export interface User {
  id: Generated<number>;
  username: string;
  password: string;
}
