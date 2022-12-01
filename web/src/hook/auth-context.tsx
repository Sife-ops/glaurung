import React, { useState, useEffect } from "react";

type AuthContextType = {
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  // signOut: () => void;
};

const authContext = (): AuthContextType => {
  const [signedIn, setSignedIn] = useState(true);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const accessToken_ = localStorage.getItem("accessToken");
    if (accessToken_) {
      setSignedIn(true);
      setAccessToken(accessToken_);
    } else {
      setSignedIn(false);
      setAccessToken("");
    }
  }, []);

  // const signOut = () => {
  //   localStorage.clear();
  //   window.location.href =
  //     import.meta.env.VITE_REGISTRAR_URL + "/sign-in?serviceId=feedshare";
  // };

  return {
    signedIn,
    setSignedIn,
    accessToken,
    setAccessToken,
  };
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const context = authContext();

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("context must be defined");
  }
  return context;
};
