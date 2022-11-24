// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { GqlContext } from "./graphql/builder";
import { database } from "./model/database";
import { decode, verify } from "jsonwebtoken";
import { expressMiddleware } from "@apollo/server/express4";
import { parse } from "graphql";
import { schema } from "./graphql/schema";

(async () => {
  const db = database({ fileMustExist: true });
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async (context): Promise<GqlContext> => {
        // console.log(context.req.headers);
        // console.log(context.req.body.query);

        const parsedQuery = parse(context.req.body.query);
        const firstFieldName = firstFieldValueNameFromOperation(
          firstOperationDefinition(parsedQuery)
        );
        // console.log(firstFieldName);

        const isPublic = [
          "user",
          //
        ].includes(firstFieldName);
        const accessToken = context.req.headers.authorization;

        let id: number;
        let username: string;
        if (!isPublic) {
          console.log("private operation");
          // if (!accessToken) throw new Error("no access token");
          // verify(accessToken, accessTokenSecret); // throws error
          // ({ userId, email } = decode(accessToken) as {
          //   userId: string;
          //   email: string;
          // });
        }

        const user = {
          id: 1,
          username: "admin",
        };

        return {
          ...context,
          db,
          user,
        };
      },
    })
  );

  await new Promise(
    (resolve) => httpServer.listen({ port: 4000 }, resolve as () => void) // todo: sus
  );
  console.log(`🚀 Server ready at http://localhost:4000`);
})();

const firstOperationDefinition = (ast: any) => ast.definitions[0];
const firstFieldValueNameFromOperation = (operationDefinition: any) =>
  operationDefinition.selectionSet.selections[0].name.value;
