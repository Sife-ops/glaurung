// import DataloaderPlugin from "@pothos/plugin-dataloader";
import SchemaBuilder from "@pothos/core";
import { database } from "./model";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export const builder = new SchemaBuilder<{
  Context: {
    user: {
      userId: string;
      email: string;
    };
  };
}>({
  // plugins: [DataloaderPlugin],
});

builder.queryType({});
builder.mutationType({});

builder.queryFields((t) => ({
  hello: t.string({
    resolve: () => {
      console.log("hello");
      return "hello";
    },
  }),
}));

builder.mutationFields((t) => ({
  mello: t.string({
    resolve: () => "mello",
  }),
}));

export const schema = builder.toSchema({});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const db = database(true);

const app = express();
const httpServer = http.createServer(app);

(async () => {
  const server = new ApolloServer({
    schema,
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(cors(), bodyParser.json(), expressMiddleware(server));

  await new Promise(
    (resolve) => httpServer.listen({ port: 4000 }, resolve as () => void) // todo: sus
  );
  console.log(`🚀 Server ready at http://localhost:4000`);
})();
