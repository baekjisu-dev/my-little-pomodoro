import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <App />
    </TooltipProvider>
  </BrowserRouter>
);
