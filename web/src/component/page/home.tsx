import { graphql } from "@glaurung/graphql/gql";
import { Service, useServicesWithTagsMutation } from "@glaurung/graphql/urql";
import { useEffect, useState } from "react";

graphql(`
  mutation servicesWithTags($tags: [String!]!, $mode: String!) {
    servicesWithTags(tags: $tags, mode: $mode) {
      id
      title
      fields {
        id
        key
        value
      }
      profiles {
        id
        title
        fields {
          id
          key
          value
        }
      }
      tags {
        id
        title
      }
    }
  }
`);

export const Home = () => {
  const [tagsInput, setTagsInput] = useState("");

  const [services, setServices] = useState<Service[]>();
  const [_, m1] = useServicesWithTagsMutation();

  useEffect(() => {
    m1({
      mode: "and",
      tags: [],
    }).then((e) => {
      e.data && setServices(e.data.servicesWithTags as Service[]);
    });
  }, []);

  return (
    <div>
      <div>tags</div>
      <input onChange={(e) => setTagsInput(e.target.value)} />
      <button
        onClick={() => {
          m1({
            mode: "and",
            tags: tagsInput ? tagsInput.split(" ") : [],
          }).then((e) => {
            e.data && setServices(e.data.servicesWithTags as Service[]);
          });
        }}
      >
        go
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {services &&
          services.map((service) => (
            <div
              key={service.id}
              style={{
                // border: "1px solid green",
                display: "flex",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  //   border: "1px solid red",
                  minWidth: "30%",
                  maxWidth: "30%",
                }}
              >
                <div>service:</div>
                <div>id: {service.id}</div>
                <div>title: {service.title}</div>

                {service.fields.length > 0 &&
                  service.fields.map((field) => {
                    if (field.key === "url") {
                      return (
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {field.key}:{" "}
                          <a href={field.value} target={"_blank"}>
                            {field.value}
                          </a>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          {field.key}: {field.value}
                        </div>
                      );
                    }
                  })}
              </div>
              <div
                style={
                  {
                    //   border: "1px solid purple",
                  }
                }
              >
                <div>profiles:</div>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  {service.profiles.length > 0 &&
                    service.profiles.map((profile) => (
                      <div>
                        <div>id: {profile.id}</div>
                        <div>title: {profile.title}</div>
                        {profile.fields.length > 0 &&
                          profile.fields.map((field) => (
                            <div>
                              {field.key}:{" "}
                              <span
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  navigator.clipboard.writeText(field.value)
                                }
                              >
                                {field.value}
                              </span>
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
