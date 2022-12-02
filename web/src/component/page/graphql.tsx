import { GraphiQL } from "graphiql";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { useAuthContext } from "../../hook/auth-context";

export const Graphql = () => {
  const auth = useAuthContext();

  const fetcher = createGraphiQLFetcher({
    url: import.meta.env.VITE_API_URL || "http://localhost:4000",
    headers: { authorization: auth.accessToken },
  });

  return <GraphiQL fetcher={fetcher} />;
};
