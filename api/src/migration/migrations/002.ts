import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  //   await db.schema
  //     .createTable("user")
  //     .addColumn("id", "serial", (col) => col.primaryKey())
  // .addColumn("first_name", "varchar", (col) => col.notNull())
  // .addColumn("last_name", "varchar")
  // .addColumn("gender", "varchar(50)", (col) => col.notNull())
  // .addColumn("created_at", "timestamp", (col) =>
  //   col.defaultTo(sql`now()`).notNull()
  // )
  // .execute();

  // await db.schema
  //   .createIndex("pet_owner_id_index")
  //   .on("pet")
  //   .column("owner_id")
  //   .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // await db.schema.dropTable("pet").execute();
  await db.schema.dropTable("service").execute();
}
