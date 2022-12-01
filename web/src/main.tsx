// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider, createClient } from "urql";
import { AuthContextProvider } from "./hook/auth-context";

const urql = createClient({
  url: import.meta.env.VITE_API_URL || "http://localhost:4000",
  fetchOptions: () => {
    return {
      headers: {
        authorization: localStorage.getItem("accessToken") || "",
      },
    };
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider value={urql}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Provider>
  // </React.StrictMode>
);
