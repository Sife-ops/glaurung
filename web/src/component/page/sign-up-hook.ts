import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { graphql } from "@glaurung/graphql/gql";
import { useSignUpMutation } from "@glaurung/graphql/urql";

export const useSignUp = () => {
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [signUpState, signUp_] = useSignUpMutation();

  const signUp = () => {
    signUp_({
      adminPassword,
      password,
      username,
    });
  };

  useEffect(() => {
    const { fetching, data, error } = signUpState;
    if (error) {
      // todo: display error
    } else if (!fetching && data) {
      nav("/sign-in");
    }
  }, [signUpState.data]);

  return {
    username,
    password,
    setUsername,
    setPassword,
    adminPassword,
    setAdminPassword,
    signUp,
  };
};

graphql(`
  mutation signUp(
    $username: String!
    $password: String!
    $adminPassword: String!
  ) {
    signUp(
      username: $username
      password: $password
      adminPassword: $adminPassword
    ) {
      id
      username
    }
  }
`);
