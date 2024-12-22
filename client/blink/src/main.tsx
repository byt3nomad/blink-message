import { Provider } from "@/components/ui/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import CreateMessagePage from "./pages/CreateMessagePage";
import OpenMessagePage from "./pages/OpenMessagePage";
import { ColorModeProvider } from "./components/ui/color-mode";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider defaultTheme="dark">
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<CreateMessagePage />} />
              <Route path=":messageId" element={<OpenMessagePage />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </ColorModeProvider>
  </StrictMode>
);
