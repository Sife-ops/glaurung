import Sqlite3 from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import { UserTable } from "./entity";

export interface Database {
  user: UserTable;
}
export const database = (fileMustExist: boolean = true) =>
  new Kysely<Database>({
    dialect: new SqliteDialect({
      database: new Sqlite3("db.sqlite", {
        fileMustExist,
      }),
    }),
  });
