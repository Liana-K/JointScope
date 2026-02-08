import React from "react";
import { createRoot } from "react-dom/client";
import SplashLogin from "./SplashLogin.jsx";
import "./index.css";

const root = document.getElementById("root");

createRoot(root).render(
  <React.StrictMode>
    <SplashLogin />

  </React.StrictMode>
);