// import reactLogo from "./assets/react.svg";
// import { useState } from "react";
import "./App.css";
import {
  Outlet,
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { graphql } from "@glaurung/graphql/gql";
import { useAuthContext } from "./hook/auth-context";
import { SignIn } from "./component/page/sign-in";
// import { useEffect } from "react";
// import { useServicesQuery } from "@glaurung/graphql/urql";

graphql(`
  query tags {
    tags {
      title
    }
  }
`);

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
          <Route path="/home" element={<div>home</div>} />
          {/* <Route path="/home" element={<Home />} />
          <Route path="/my-feeds" element={<MyFeeds />} />
          <Route path="/add-feed" element={<AddFeed />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/feed/:feedId" element={<Feed />} />
          <Route path="/article/:articleId" element={<Article />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/" element={<Navigate to="/home" />} /> */}
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
