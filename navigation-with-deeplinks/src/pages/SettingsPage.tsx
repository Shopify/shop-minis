import { useState } from "react";
import { Touchable } from "@shopify/shop-minis-react";
import {
  ChevronRight,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

interface SettingItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  type: "navigation" | "toggle" | "action";
}

const settingsSections = [
  {
    title: "Preferences",
    items: [
      {
        id: "notifications",
        label: "Notifications",
        description: "Manage notification settings",
        icon: Bell,
        type: "navigation" as const,
      },
      {
        id: "dark-mode",
        label: "Dark Mode",
        description: "Toggle dark mode appearance",
        icon: Moon,
        type: "toggle" as const,
      },
      {
        id: "appearance",
        label: "Appearance",
        description: "Customize app appearance",
        icon: Palette,
        type: "navigation" as const,
      },
      {
        id: "language",
        label: "Language",
        description: "English",
        icon: Globe,
        type: "navigation" as const,
      },
    ],
  },
  {
    title: "Account & Security",
    items: [
      {
        id: "privacy",
        label: "Privacy & Security",
        description: "Manage your privacy settings",
        icon: Shield,
        type: "navigation" as const,
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        id: "help",
        label: "Help Center",
        description: "Get help and support",
        icon: HelpCircle,
        type: "navigation" as const,
      },
    ],
  },
  {
    title: "Other",
    items: [
      {
        id: "logout",
        label: "Log Out",
        icon: LogOut,
        type: "action" as const,
      },
    ],
  },
];

export function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  const handleSettingPress = (item: SettingItem) => {
    if (item.type === "toggle" && item.id === "dark-mode") {
      setDarkMode(!darkMode);
    } else if (item.type === "action" && item.id === "logout") {
      // Handle logout action
    } else if (item.type === "navigation") {
      // Navigate to setting detail page
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your app preferences and account
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white p-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">John Doe</h2>
            <p className="text-sm text-gray-600">john.doe@example.com</p>
          </div>
          <Touchable
            onClick={() => {}}
            className="p-2 hover:bg-gray-100 rounded-full min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Edit profile"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Touchable>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4 px-4 pb-24">
        {settingsSections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-white rounded-lg overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {section.title}
              </h3>
            </div>
            <div>
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isLast = itemIndex === section.items.length - 1;
                const isDarkModeToggle = item.id === "dark-mode";

                return (
                  <Touchable
                    key={item.id}
                    onClick={() => handleSettingPress(item)}
                    className={`text-left px-4 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors min-h-[68px] ${
                      !isLast ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        {"description" in item && item.description && (
                          <div className="text-sm text-gray-500 mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </div>
                      {item.type === "toggle" && isDarkModeToggle ? (
                        <div
                          className={`relative w-12 h-7 rounded-full transition-colors ${
                            darkMode ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                              darkMode ? "translate-x-6" : "translate-x-1"
                            }`}
                          >
                            {darkMode ? (
                              <Moon className="w-3 h-3 text-blue-600 m-1" />
                            ) : (
                              <Sun className="w-3 h-3 text-gray-600 m-1" />
                            )}
                          </div>
                        </div>
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  </Touchable>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Version Info */}
      <div className="px-4 py-6 text-center text-sm text-gray-500">
        <p>Navigation Demo Mini</p>
        <p className="mt-1">Version 1.0.0</p>
      </div>
    </div>
  );
}
