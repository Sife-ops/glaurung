import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("serviceField")
    .addColumn("type", "varchar", (col) => col.notNull().defaultTo("text"))
    .execute();
  const a = await db.selectFrom("serviceField").selectAll().execute();
  for (const b of a) {
    if (b.key === "password") {
      await db
        .updateTable("serviceField")
        .set({ type: "password" })
        .where("id", "=", b.id)
        .execute();
    } else if (b.key === "url") {
      await db
        .updateTable("serviceField")
        .set({ type: "url" })
        .where("id", "=", b.id)
        .execute();
    }
  }

  await db.schema
    .alterTable("profileField")
    .addColumn("type", "varchar", (col) => col.notNull().defaultTo("text"))
    .execute();
  const c = await db.selectFrom("profileField").selectAll().execute();
  for (const d of c) {
    if (d.key === "password") {
      await db
        .updateTable("profileField")
        .set({ type: "password" })
        .where("id", "=", d.id)
        .execute();
    } else if (d.key === "url") {
      await db
        .updateTable("profileField")
        .set({ type: "url" })
        .where("id", "=", d.id)
        .execute();
    }
  }
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("profileField").dropColumn("type").execute();
  await db.schema.alterTable("serviceField").dropColumn("type").execute();
}
