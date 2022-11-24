import { graphql } from "@glaurung/graphql/gql";
import { useTagsQuery } from "@glaurung/graphql/urql";
import { useEffect } from "react";

graphql(`
  query tags {
    tags {
      title
    }
  }
`);

export const Home = () => {
  const [tagsQueryState] = useTagsQuery();

  //   useEffect(() => {
  //   }, [tagsQueryState.data]);

  return (
    <div>
      <div>home</div>
    </div>
  );
};
