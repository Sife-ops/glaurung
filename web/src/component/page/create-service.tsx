import { graphql } from "@glaurung/graphql/gql";
import { useCreateServiceMutation } from "@glaurung/graphql/urql";
import { useEffect, useState } from "react";
// import { useTagsQuery } from "@glaurung/graphql/urql";
// import { useEffect } from "react";

import { useTags } from "../../hook/tags";

graphql(`
  mutation createService($title: String!) {
    createService(title: $title) {
      id
    }
  }
`);

export const CreateService = () => {
  const tags = useTags();
  const [_, createService_] = useCreateServiceMutation();
  const [title, setTitle] = useState("");

  const [fields, setFields] = useState<{ key: string; value: string }[]>([
    { key: "url", value: "" },
  ]);
  const setField = (i: number, key: string, value: string) => {
    setFields((state) =>
      state.map((field, index) => {
        if (index === i) {
          return {
            key,
            value,
          };
        } else {
          return field;
        }
      })
    );
  };

  const createService = () =>
    createService_({
      title,
    }).then((createService) => {
      if (createService.data) {
        return tags.updateServiceTags(createService.data.createService.id);
      }
    });

  return (
    <div>
      <div>create service</div>

      <span>title</span>
      <br />
      <input
        //
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </div>
  );
};

// const Fields: React.FC<{ fields: { key: string; value: string }[] }> = (p) => {
//   return p.fields.map((field) => (
//     <div>
//       <div>field</div>
//     </div>
//   ));
// };
