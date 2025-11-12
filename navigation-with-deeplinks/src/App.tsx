import { useEffect } from "react";
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

  useEffect(() => {
    if (path) {
      // Handle deeplink navigation
      // The deeplink path will be used to navigate to the appropriate page
      // Navigate to the deeplink path
      // The path from the deeplink should match our route structure
      navigate(path);
    }
  }, [path]);

  return null;
}

function AppContent() {
  return (
    <>
      <DeeplinkHandler />
      <Routes>
        <Route index element={<ListPage />} />
        <Route path="/item/:id" element={<DetailPage />} />
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
