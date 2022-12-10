import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user")
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("username", "varchar", (col) => col.notNull().unique())
    .addColumn("password", "varchar", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("service")
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("userId", "integer", (col) =>
      col.references("user.id").onDelete("cascade").notNull()
    )
    .addColumn("title", "varchar", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("serviceField")
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("serviceId", "integer", (col) =>
      col.references("service.id").onDelete("cascade").notNull()
    )
    .addColumn("key", "varchar", (col) => col.notNull())
    .addColumn("value", "varchar", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("serviceTag")
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("serviceId", "integer", (col) =>
      col.references("service.id").onDelete("cascade").notNull()
    )
    .addColumn("tagId", "integer", (col) =>
      // todo: cascade?
      col.references("tag.id").onDelete("cascade").notNull()
    )
    .execute();

  await db.schema
    .createTable("tag")
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("userId", "integer", (col) =>
      col.references("user.id").onDelete("cascade").notNull()
    )
    .addColumn("title", "varchar", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("profile")
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("serviceId", "integer", (col) =>
      col.references("service.id").onDelete("cascade").notNull()
    )
    .addColumn("title", "varchar", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("profileField")
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("profileId", "integer", (col) =>
      col.references("profile.id").onDelete("cascade").notNull()
    )
    .addColumn("key", "varchar", (col) => col.notNull())
    .addColumn("value", "varchar", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // todo: down
  await db.schema.dropTable("profileField").execute();
  await db.schema.dropTable("profile").execute();
  await db.schema.dropTable("tag").execute();
  await db.schema.dropTable("serviceTag").execute();
  await db.schema.dropTable("serviceField").execute();
  await db.schema.dropTable("service").execute();
  await db.schema.dropTable("user").execute();
}
