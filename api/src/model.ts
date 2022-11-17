import Sqlite3 from "better-sqlite3";
import { Kysely, Generated, ColumnType, SqliteDialect } from "kysely";

// interface PersonTable {
//   id: Generated<number>;
//   first_name: string;
//   gender: "male" | "female" | "other";
//   last_name: string | null;
//   modified_at: ColumnType<Date, string | undefined, never>;
// }

// interface PetTable {
//   id: Generated<number>;
//   name: string;
//   owner_id: number;
//   species: "dog" | "cat";
// }

interface UserTable {
  id: Generated<number>;
  username: string;
  password: string;
}

interface Database {
  // person: PersonTable;
  // pet: PetTable;
  user: UserTable;
}

export const db = (fileMustExist: boolean = true) =>
  new Kysely<Database>({
    dialect: new SqliteDialect({
      database: new Sqlite3("db.sqlite", {
        fileMustExist,
      }),
    }),
  });
