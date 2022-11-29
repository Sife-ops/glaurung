import { graphql } from "@glaurung/graphql/gql";
import {
  Tag as Tag_,
  useTagsQuery,
  useUpdateServiceTagsMutation,
} from "@glaurung/graphql/urql";
import { useEffect, useState } from "react";

graphql(`
  query tags {
    tags {
      id
      title
    }
  }
`);

graphql(`
  mutation updateServiceTags($serviceId: Int!, $tagIds: [Int!]!) {
    updateServiceTags(serviceId: $serviceId, tagIds: $tagIds) {
      id
    }
  }
`);

// todo: don't use partial
export type Tag = Partial<{ selected: boolean } & Tag_>;

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  const [tagsState] = useTagsQuery();
  useEffect(() => {
    const { fetching, data } = tagsState;
    if (!fetching && data) {
      setTags((state) => {
        return data.tags.map((tag) => ({
          ...tag,
          selected:
            state.find((stateTag) => stateTag.id === tag.id)?.selected || false,
        }));
      });
    }
  }, [tagsState.data]);

  const toggleSelected = (tagId: string) => {
    setTags((state) => {
      return state.map((stateTag) => ({
        ...stateTag,
        selected:
          stateTag.id === tagId ? !stateTag.selected : stateTag.selected,
      }));
    });
  };

  const [_, updateServiceTags_] = useUpdateServiceTagsMutation();
  const updateServiceTags = (serviceId: string) =>
    updateServiceTags_({
      serviceId: parseInt(serviceId),
      tagIds: tags
        .filter((e) => e.selected)
        .map((e) => parseInt(e.id as string)),
    });

  return {
    tags,
    toggleSelected,
    updateServiceTags,
  };
};
