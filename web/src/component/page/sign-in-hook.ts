import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { graphql } from "@glaurung/graphql/gql";
import { useSignInMutation } from "@glaurung/graphql/urql";
import { useAuthContext } from "../../hook/auth-context";

export const useSignIn = () => {
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signInState, signIn_] = useSignInMutation();

  const signIn = () => {
    console.log("signin");
    signIn_({
      password,
      username,
    });
  };

  const authContext = useAuthContext();

  useEffect(() => {
    const { fetching, data, error } = signInState;
    if (error) {
      //   console.error(error.message);
      //   if (error.message.includes("not confirmed")) {
      //     nav(`/unconfirmed?email=${email}`);
      //   } else {
      //     setError(error.message.split("[GraphQL] ")[1]);
      //   }
    } else if (!fetching && data) {
      localStorage.setItem("accessToken", data.signIn);
      authContext.setAccessToken(data.signIn);
      authContext.setSignedIn(true);
      nav("/home");
    }
  }, [signInState.data]);

  return {
    username,
    password,
    setUsername,
    setPassword,
    signIn,
  };
};

graphql(`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`);
