import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Root from "./Root";
import { registerServiceWorker } from "./pwa/register-service-worker";
import "./shared/styles/global.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>,
);
registerServiceWorker();
