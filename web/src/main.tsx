// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider, createClient } from "urql";

const urql = createClient({
  url: "http://localhost:4000",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider value={urql}>
    <App />
  </Provider>
  // </React.StrictMode>
);
