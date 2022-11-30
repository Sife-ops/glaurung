import * as migrations from "./migrations";
import { Migrator } from "kysely";
import { database } from "../model/database";
import { hashSync } from "bcryptjs";

const migrateToLatest = async () => {
  database({ fileMustExist: false }); // create file
  const db = database({ fileMustExist: true });

  const migrator = new Migrator({
    db,
    provider: {
      getMigrations: async () => {
        return migrations;
      },
    },
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  /**
   * create default user
   */
  try {
    // todo: annoying message
    await db
      .insertInto("user")
      .values({
        id: 1,
        username: "admin",
        password: hashSync("pass"),
      })
      .executeTakeFirstOrThrow();
    console.log("created admin account");
  } catch {
    //
  }

  await db.destroy();
};

(async () => {
  await migrateToLatest();
})();
