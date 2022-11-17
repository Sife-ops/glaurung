import { Migrator } from "kysely";
import { db } from "../model";
import * as _001 from "./migrations/2022-11-17T00:22:54Z";

const migrateToLatest = async () => {
  db(false);
  const db_ = db(true);

  const migrator = new Migrator({
    db: db_,
    provider: {
      getMigrations: async () => {
        return {
          _001,
        };
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

  await db_.destroy();
};

(async () => {
  await migrateToLatest();
})();
