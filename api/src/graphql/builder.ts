import SchemaBuilder from "@pothos/core";
import DataloaderPlugin from "@pothos/plugin-dataloader";
import { Kysely } from "kysely";
import { Database } from "../model/database";

export interface GqlContext {
  user: {
    id: number;
    username: string;
  };

  db: Kysely<Database>;
}

export const builder = new SchemaBuilder<{ Context: GqlContext }>({
  plugins: [DataloaderPlugin],
});

builder.queryType({});
builder.mutationType({});
