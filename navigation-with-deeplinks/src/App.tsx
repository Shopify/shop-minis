import { useEffect, useRef } from "react";
import {
  MinisRouter,
  useDeeplink,
  useNavigateWithTransition,
} from "@shopify/shop-minis-react";
import { Routes, Route } from "react-router";
import { TabBar } from "./components/TabBar";
import { ListPage } from "./pages/ListPage";
import { DetailPage } from "./pages/DetailPage";
import { ModalsPage } from "./pages/ModalsPage";
import { SettingsPage } from "./pages/SettingsPage";

function DeeplinkHandler() {
  const { path } = useDeeplink();
  const navigate = useNavigateWithTransition();
  const hasNavigatedRef = useRef<string | null>(null);

  useEffect(() => {
    if (path && hasNavigatedRef.current !== path) {
      hasNavigatedRef.current = path;
      navigate(path);
    }
  }, [path, navigate]);

  return null;
}

function AppContent() {
  return (
    <>
      <DeeplinkHandler />
      <Routes>
        <Route path="/" element={<ListPage />}>
          <Route path="/item/:id" element={<DetailPage />} />
        </Route>
        <Route path="/modals" element={<ModalsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <TabBar />
    </>
  );
}

export function App() {
  return (
    <MinisRouter viewTransitions>
      <AppContent />
    </MinisRouter>
  );
}
