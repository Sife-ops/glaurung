import React, { useEffect, useState } from "react";
import { graphql } from "@glaurung/graphql/gql";
import { useTags } from "./tags";

import {
  useAllServicesMutation,
  useServicesWithTagsMutation,
  Service,
} from "@glaurung/graphql/urql";

graphql(`
  mutation allServices {
    servicesWithTags {
      id
      title
      fields {
        key
        value
      }
    }
  }
`);

graphql(`
  mutation servicesWithTags($tagIds: [Int!]!, $mode: String) {
    servicesWithTags(tagIds: $tagIds, mode: $mode) {
      id
      title
      fields {
        key
        value
      }
    }
  }
`);

type UserContextType = {
  //   self: User | undefined;
  //   setShowMenu: () => void;
  //   showMenu: boolean;
  //   setShowUserMenu: () => void;
  //   showUserMenu: boolean;
};

const userContext = (): UserContextType => {
  // services
  const [services, setServices] = useState<Service[]>([]);

  const [__, allServices] = useAllServicesMutation();
  useEffect(() => {
    allServices({}).then((res) => {
      if (res.data) {
        setServices(res.data.servicesWithTags as Service[]);
      }
    });
  }, []);

  const [_, servicesWithTags_] = useServicesWithTagsMutation();
  const servicesWithTags = () => {
    servicesWithTags_({
      mode: "and", // todo: graphql enum type
      tagIds: tags
        .filter((e) => e.selected)
        .map((e) => parseInt(e.id as string)),
    }).then((res) => {
      if (res.data) {
        setServices(res.data.servicesWithTags as Service[]);
      }
    });
  };

  // tags
  const { tags, toggleSelected } = useTags();

  return {
    services,
    tags,
    toggleSelected,
    servicesWithTags,
  };
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = (props: { children: React.ReactNode }) => {
  const context = userContext();

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("context must be defined");
  }
  return context;
};
