import "graphiql/graphiql.css";
import React from "react";
import { GraphiQL } from "graphiql";
import { SignIn } from "./component/page/sign-in";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { useAuthContext } from "./hook/auth-context";

import {
  Outlet,
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";

const fetcher = createGraphiQLFetcher({
  url: import.meta.env.VITE_API_URL || "http://localhost:4000",
  headers: {
    authorization: localStorage.getItem("accessToken") || "",
  },
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<GraphiQL fetcher={fetcher} />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/error" element={<div>404</div>} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
}

const PrivateRoutes: React.FC = () => {
  const { signedIn } = useAuthContext();
  const nav = useNavigate();

  if (!signedIn) {
    nav("/sign-in");
  }

  return <Outlet />;
};

export default App;
