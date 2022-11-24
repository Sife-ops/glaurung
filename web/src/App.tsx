// import reactLogo from "./assets/react.svg";
// import { useEffect } from "react";
// import { useServicesQuery } from "@glaurung/graphql/urql";
// import { useState } from "react";
import "./App.css";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            // <UserContextProvider>
            //   <Navigation />
            //   <Spacer />
            <PrivateRoutes />
            // </UserContextProvider>
          }
        >
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        {/* <Route path="/sign-in" element={<div>sign in</div>} /> */}
        <Route path="/error" element={<div>404</div>} />
        <Route path="*" element={<Navigate to="/error" />} />
        {/* {import.meta.env.DEV && <Route path="/dev" element={<Dev />} />}
        <Route path="/auth" element={<Auth to="/home" />} />
        <Route path="/error" element={<div>404</div>} />
        <Route path="*" element={<Navigate to="/error" />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );

  // return (
  //   <div>
  //     <div>app</div>
  //   </div>
  // );
}

const PrivateRoutes: React.FC = () => {
  const { signedIn } = useAuthContext();
  const nav = useNavigate();

  if (!signedIn) {
    // window.location.href =
    //   import.meta.env.VITE_REGISTRAR_URL + "/sign-in?serviceId=feedshare";
    nav("/sign-in");
  }

  return <Outlet />;
};

export default App;
