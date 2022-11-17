import Sqlite3 from "better-sqlite3";
import { Kysely, Selectable, SqliteDialect } from "kysely";
import * as Table from "./entity";

export interface Database {
  user: Table.UserTable;
  service: Table.ServiceTable;
  serviceField: Table.ServiceFieldTable;
}

export const database = (fileMustExist: boolean = true) =>
  new Kysely<Database>({
    dialect: new SqliteDialect({
      database: new Sqlite3("db.sqlite", {
        fileMustExist,
      }),
    }),
  });

export type Row = {
  [Key in keyof Database]: Selectable<Database[Key]>;
};
