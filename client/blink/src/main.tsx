import { Provider } from "@/components/ui/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import CreateMessage from "./pages/CreateMessage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route index element={<CreateMessage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
