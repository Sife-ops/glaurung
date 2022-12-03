import Fuse from "fuse.js";
import { Service, useServicesWithTagsMutation } from "@glaurung/graphql/urql";
import { graphql } from "@glaurung/graphql/gql";
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
  const [filterInput, setFilterInput] = useState("");

  const [services, setServices] = useState<Service[]>();
  const [ms1, m1] = useServicesWithTagsMutation();

  useEffect(() => {
    m1({
      mode: "and",
      tags: [],
    }).then((e) => {
      e.data && setServices(e.data.servicesWithTags as Service[]);
    });
  }, []);

  useEffect(() => {
    if (ms1.data) {
      if (filterInput) {
        const result = new Fuse(ms1.data.servicesWithTags, {
          includeScore: true,
          keys: ["title"],
        }).search(filterInput);
        setServices(result.map((e) => e.item) as Service[]);
      } else {
        setServices(ms1.data.servicesWithTags as Service[]);
      }
    }
  }, [filterInput]);

  return (
    <div
      style={{
        margin: "1rem",
      }}
    >
      <div>tags:</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          m1({
            mode: "and",
            tags: tagsInput ? tagsInput.split(" ") : [],
          }).then((e) => {
            e.data && setServices(e.data.servicesWithTags as Service[]);
          });
        }}
      >
        <input onChange={(e) => setTagsInput(e.target.value)} />
        <button type="submit">go</button>
      </form>
      <div>filter:</div>
      <input onChange={(e) => setFilterInput(e.target.value)} />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <div
            style={{
              minWidth: "30%",
              maxWidth: "30%",
            }}
          >
            service
          </div>
          <div>profiles</div>
        </div>
        {services &&
          services.map((service) => (
            <div
              key={service.id}
              style={{
                border: "1px solid green",
                display: "flex",
                gap: "1rem",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  minWidth: "30%",
                  maxWidth: "30%",
                }}
              >
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
              <div>
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
                            <C1 field={field} key={field.id} />
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

const C1: React.FC<{ field: { key: string; value: string } }> = (p) => {
  const [showPassword, setShowPassword] = useState(false);

  if (p.field.key === "password") {
    return (
      <div>
        {p.field.key}:{" "}
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigator.clipboard.writeText(p.field.value)}
        >
          {showPassword ? p.field.value : "****************"}
        </span>{" "}
        <button onClick={() => setShowPassword((s) => !s)}>show</button>
      </div>
    );
  } else {
    return (
      <div>
        {p.field.key}:{" "}
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => navigator.clipboard.writeText(p.field.value)}
        >
          {p.field.key}
        </span>
      </div>
    );
  }
};
