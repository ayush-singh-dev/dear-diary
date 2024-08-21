import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./store/UserContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </Router>
);
