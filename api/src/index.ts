// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { GqlContext } from "./graphql/builder";
import { ctxLogger } from "./graphql/logger";
import { database } from "./model/database";
import { expressMiddleware } from "@apollo/server/express4";
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
        const user = {
          id: 1,
          username: "admin",
        };

        const ctx = {
          ...context,
          db,
          user,
        };

        return {
          ...ctx,
          fileLogger: ctxLogger(ctx),
          selectUserServices: () =>
            db
              .selectFrom("user")
              .where("user.id", "=", user.id)
              .innerJoin("service", "service.userId", "user.id"),
        };
      },
    })
  );

  await new Promise(
    (resolve) => httpServer.listen({ port: 4000 }, resolve as () => void) // todo: sus
  );
  console.log(`🚀 Server ready at http://localhost:4000`);
})();
