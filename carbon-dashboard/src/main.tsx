import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalTheme } from "@carbon/react";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalTheme theme='g100'>
      <App />
    </GlobalTheme>
  </StrictMode>
);
