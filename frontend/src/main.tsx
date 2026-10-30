import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { MonitoringProvider } from "./context/MonitoringProvider";
import { ToastProvider } from "./context/ToastProvider";
import { AlertToaster } from "./components/AlertToaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <MonitoringProvider>
          <AlertToaster />
          <App />
        </MonitoringProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
