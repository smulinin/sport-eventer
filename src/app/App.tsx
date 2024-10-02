import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "../shared/styles/reset.css";
import MainPage from "../pages/MainPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainPage />
  </StrictMode>
);
