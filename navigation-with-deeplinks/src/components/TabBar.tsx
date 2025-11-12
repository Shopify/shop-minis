import { Touchable } from "@shopify/shop-minis-react";
import { List, Grid, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

interface TabItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: TabItem[] = [
  {
    id: "list",
    label: "List",
    path: "/",
    icon: List,
  },
  {
    id: "modals",
    label: "Modals",
    path: "/modals",
    icon: Grid,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export function TabBar() {
  const location = useLocation();
  const navigate = useNavigate(); // Use regular navigate for tabs (no transitions)

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/item");
    }
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="grid grid-cols-3 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);

          return (
            <div key={tab.id} className="flex items-center justify-center">
              <Touchable
                onClick={() => navigate(tab.path)}
                className="!flex !flex-col !items-center !justify-center py-2 min-h-[60px] transition-colors !w-auto px-4"
                aria-label={tab.label}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={`w-6 h-6 mb-1 transition-colors ${
                    active ? "text-blue-600" : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    active ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {tab.label}
                </span>
              </Touchable>
            </div>
          );
        })}
      </div>
    </div>
  );
}
