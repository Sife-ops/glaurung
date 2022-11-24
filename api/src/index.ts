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
    (req, res, next) => {
      try {
        const parsedQuery = parse(req.body.query);
        const firstFieldName = firstFieldValueNameFromOperation(
          firstOperationDefinition(parsedQuery)
        );

        const isPublic = ["signIn"].includes(firstFieldName);
        const accessToken = req.headers.authorization;

        if (!isPublic) {
          console.log("private operation");
          if (!accessToken) throw new Error("no access token");
          verify(accessToken, "// todo: secret"); // throws error

          // @ts-ignore
          req.user = decode(accessToken) as {
            id: string;
            username: string;
          };
        }

        next();
      } catch {
        res.status(401).send();
      }
    },
    expressMiddleware(server, {
      context: async (context): Promise<GqlContext> => {
        // const user = {
        //   id: 1,
        //   username: "admin",
        // };

        // @ts-ignore
        console.log(context.req.user);

        return {
          ...context,
          db,
          // @ts-ignore
          user: context.req.user,
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
