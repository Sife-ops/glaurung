import { Kysely, sql } from "kysely";

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
    .addColumn("title", "varchar", (col) => col.notNull())
    .execute();

  // await db.schema
  //   .createTable("serviceProfile")
  //   .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
  //   .addColumn("serviceId", "integer", (col) =>
  //     col.references("service.id").onDelete("cascade").notNull()
  //   )
  //   .addColumn("profileId", "integer", (col) =>
  //     col.references("profile.id").onDelete("cascade").notNull()
  //   )
  //   .execute();

  await db.schema
    .createTable("profile")
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("userId", "integer", (col) =>
      col.references("user.id").onDelete("cascade").notNull()
    )
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
  // await db.schema.dropTable("pet").execute();
  // todo: down
  await db.schema.dropTable("user").execute();
}
