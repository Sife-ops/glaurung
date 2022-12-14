import * as Table from "./entity";
import Sqlite3 from "better-sqlite3";
import { Kysely, Selectable, SqliteDialect } from "kysely";

export interface Database {
  user: Table.User;
  service: Table.Service;
  serviceField: Table.ServiceField;
  serviceTag: Table.ServiceTag;
  tag: Table.Tag;
  profile: Table.Profile;
  profileField: Table.ProfileField;
}

export const database = ({ fileMustExist }: { fileMustExist: boolean }) =>
  new Kysely<Database>({
    dialect: new SqliteDialect({
      database: new Sqlite3("./database/glaurung.sqlite", {
        fileMustExist,
      }),
    }),
  });

export type Row = {
  [Key in keyof Database]: Selectable<Database[Key]>;
};
