import SchemaBuilder from "@pothos/core";
import DataloaderPlugin from '@pothos/plugin-dataloader'
import { Kysely } from "kysely";
import { Database, database } from "../model/database";

const db = database({ fileMustExist: true }); // todo: sus argument

export const builder = new SchemaBuilder<{
  Context: {
    user: {
      id: number;
      username: string;
    };
    db: Kysely<Database>;
  };
}>({
  plugins: [DataloaderPlugin],
});

builder.queryType({});
builder.mutationType({});
