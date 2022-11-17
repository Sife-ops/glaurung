import SchemaBuilder from "@pothos/core";
import { Kysely } from "kysely";
import { Database, database } from "../model";

const db = database(true);

export const builder = new SchemaBuilder<{
  Context: {
    //   user: {
    //     userId: string;
    //     email: string;
    //   };
    todo: string;
    db: Kysely<Database>;
  };
}>({
  // plugins: [DataloaderPlugin],
});

builder.queryType({});
builder.mutationType({});
