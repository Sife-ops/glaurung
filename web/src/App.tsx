// import reactLogo from "./assets/react.svg";
// import { useState } from "react";
import "./App.css";
import { graphql } from "@glaurung/graphql/gql";
import { useServicesQuery } from "@glaurung/graphql/urql";
import { useEffect } from "react";

graphql(`
  query services {
    tags {
      title
    }
  }
`);

function App() {
  const [servicesQueryState] = useServicesQuery();

  useEffect(() => {
    const { fetching, data } = servicesQueryState;
    if (!fetching && data) {
      console.log(data.services);
    }
  }, [servicesQueryState.data]);

  return (
    <div>
      <div>app</div>
    </div>
  );
}

export default App;
