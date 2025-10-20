import {
  useNavigateWithTransition,
  Touchable,
} from "@shopify/shop-minis-react";

export function LibrariesPage() {
  const navigate = useNavigateWithTransition();

  const libraryCategories = [
    {
      title: "Animation & UI",
      description: "Framer Motion, Lucide Icons, Radix UI",
      path: "/libraries/animation-ui",
      icon: "🎨",
    },
    {
      title: "State & Utilities",
      description: "Zustand, React Query, Lodash, ULID",
      path: "/libraries/state-utils",
      icon: "🔧",
    },
    {
      title: "Carousel",
      description: "Embla Carousel with plugins",
      path: "/libraries/carousel",
      icon: "🎠",
    },
    {
      title: "Drag & Drop",
      description: "DnD Kit for touch-optimized interactions",
      path: "/libraries/drag-drop",
      icon: "✋",
    },
    {
      title: "Emoji Picker",
      description: "Emoji Mart - Complete emoji solution",
      path: "/libraries/emoji",
      icon: "😊",
    },
    {
      title: "3D Graphics",
      description: "Three.js & React Three Fiber",
      path: "/libraries/3d",
      icon: "🎮",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center px-4 py-3">
          <Touchable
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg"
            style={{ minHeight: "48px", minWidth: "48px" }}
          >
            <span className="text-xl">←</span>
          </Touchable>
          <div className="flex-1 ml-2">
            <h1 className="text-lg font-bold text-gray-900">
              Third-Party Libraries
            </h1>
            <p className="text-xs text-gray-600">Explore supported libraries</p>
          </div>
        </div>
      </div>

      {/* Library Categories */}
      <div className="flex-1 p-4 space-y-3">
        {libraryCategories.map((category) => (
          <Touchable
            key={category.path}
            onClick={() => navigate(category.path)}
            className="bg-white rounded-lg border border-gray-200 p-4"
            style={{ minHeight: "80px" }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{category.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  {category.title}
                </div>
                <div className="text-sm text-gray-600">
                  {category.description}
                </div>
              </div>
              <span className="text-gray-400 text-xl">→</span>
            </div>
          </Touchable>
        ))}
      </div>
    </div>
  );
}
