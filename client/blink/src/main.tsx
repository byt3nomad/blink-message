import { Provider } from "@/components/ui/provider";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { ColorModeProvider } from "./components/ui/color-mode";
import Home from "./pages/Home";
import Message from "./pages/Message";

createRoot(document.getElementById("root")!).render(
  <ColorModeProvider defaultTheme="dark">
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path=":messageId" element={<Message />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </ColorModeProvider>
);
