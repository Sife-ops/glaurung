// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider, createClient } from "urql";

const urql = createClient({
  // todo: variable url
  url: "https://izwqvemxce.execute-api.us-east-1.amazonaws.com",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider value={urql}>
    <App />
  </Provider>
  // </React.StrictMode>
);
