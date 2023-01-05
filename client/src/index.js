import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeProvider } from "./context/darkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <DarkModeProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </DarkModeProvider>
  // </React.StrictMode>
);
