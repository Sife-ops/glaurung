import { GraphiQL } from "graphiql";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { useState } from "react";
import { useAuthContext } from "../../hook/auth-context";

export const Home = () => {
  const auth = useAuthContext();

  const fetcher = createGraphiQLFetcher({
    url: import.meta.env.VITE_API_URL || "http://localhost:4000",
    headers: { authorization: auth.accessToken },
  });

  const [leftExpanded, setLeftExpanded] = useState(true);
  const [rightExpanded, setRightExpanded] = useState(false);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {leftExpanded && (
        <div
          style={{
            width: "100%",
          }}
        >
          <GraphiQL fetcher={fetcher} />
        </div>
      )}
      <div
        style={{
          backgroundColor: "lightblue",
          minWidth: "3rem",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={controlStyle}
          onClick={() => {
            setLeftExpanded(true);
            setRightExpanded(false);
          }}
        >
          <div>{">>"}</div>
        </div>
        <div
          style={controlStyle}
          onClick={() => {
            setLeftExpanded(true);
            setRightExpanded(true);
          }}
        >
          {"=="}
        </div>
        <div
          style={controlStyle}
          onClick={() => {
            setLeftExpanded(false);
            setRightExpanded(true);
          }}
        >
          {"<<"}
        </div>
      </div>
      {rightExpanded && (
        <div
          style={{
            width: "100%",
          }}
        />
      )}
    </div>
  );
};

const controlStyle = {
  border: "1px solid purple",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
