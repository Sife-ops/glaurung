import "graphiql/graphiql.css";
import React from "react";
import { SignIn } from "./component/page/sign-in";
import { useAuthContext } from "./hook/auth-context";

import {
  Outlet,
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { Home } from "./component/page/home";
import { Graphql } from "./component/page/graphql";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/graphql" element={<Graphql />} />
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
