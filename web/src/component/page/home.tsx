import Fuse from "fuse.js";
import {
  Profile,
  ProfileField,
  Service,
  useServicesWithTagsMutation,
} from "@glaurung/graphql/urql";
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
                          key={field.id}
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {field.key} ({field.id}):{" "}
                          <a href={field.value} target={"_blank"}>
                            {field.value}
                          </a>
                        </div>
                      );
                    } else {
                      return (
                        <div key={field.id}>
                          {field.key} ({field.id}): {field.value}
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
                  <Profiles profiles={service.profiles} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const Profiles: React.FC<{ profiles: Profile[] }> = (p) => {
  const main = p.profiles.find((f) => f.title === "main");

  let sorted: Profile[] = [];
  if (main) sorted = [main, ...sorted];
  sorted = [...sorted, ...p.profiles.filter((f) => f.title !== "main")];

  if (sorted.length < 1) return null;
  else {
    return (
      <>
        {sorted.map((profile) => (
          <div key={profile.id}>
            <div>id: {profile.id}</div>
            <div>title: {profile.title}</div>
            <Fields fields={profile.fields} />
          </div>
        ))}
      </>
    );
  }
};

const Fields: React.FC<{ fields: ProfileField[] }> = (p) => {
  const email = p.fields.find((f) => f.key === "email");
  const username = p.fields.find((f) => f.key === "username");
  const password = p.fields.find((f) => f.key === "password");

  let sorted: ProfileField[] = [];
  if (password) sorted = [password, ...sorted];
  if (username) sorted = [username, ...sorted];
  if (email) sorted = [email, ...sorted];
  sorted = [
    ...sorted,
    ...p.fields.filter((f) => {
      if (f.key !== "email" && f.key !== "username" && f.key !== "password") {
        return true;
      } else {
        return false;
      }
    }),
  ];

  if (sorted.length < 1) return null;
  else {
    return (
      <>
        {sorted.map((field) => (
          <Field field={field} key={field.id} />
        ))}
      </>
    );
  }
};

const Field: React.FC<{ field: ProfileField }> = (p) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = p.field.key === "password";

  return (
    <div>
      {p.field.key} ({p.field.id}):{" "}
      <span
        style={{
          cursor: "pointer",
        }}
        onClick={() => navigator.clipboard.writeText(p.field.value)}
      >
        {(() => {
          if (isPassword) {
            if (showPassword) {
              return p.field.value;
            } else {
              return "****************";
            }
          } else {
            return p.field.value;
          }
        })()}
      </span>{" "}
      {isPassword && (
        <button onClick={() => setShowPassword((s) => !s)}>show</button>
      )}
    </div>
  );
};
