import SchemaBuilder from "@pothos/core";
import { FileLogger } from "./logger";
import DataloaderPlugin from "@pothos/plugin-dataloader";
import { Kysely, SelectQueryBuilder } from "kysely";
import { Database } from "../model/database";
import { From } from "kysely/dist/cjs/parser/table-parser";

export interface GqlContext {
  user: {
    id: number;
    username: string;
  };

  db: Kysely<Database>;

  fileLogger: FileLogger;

  userSelectFrom: (
    t: keyof Database
  ) => SelectQueryBuilder<From<Database, keyof Database>, keyof Database, {}>;
}

export const builder = new SchemaBuilder<{ Context: GqlContext }>({
  plugins: [DataloaderPlugin],
});

builder.queryType({});
builder.mutationType({});
