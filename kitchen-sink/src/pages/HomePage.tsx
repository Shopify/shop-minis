import {
  useNavigateWithTransition,
  Touchable,
} from "@shopify/shop-minis-react";

export function HomePage() {
  const navigate = useNavigateWithTransition();

  const navigationItems = [
    {
      title: "SDK Components & Hooks",
      description: "Test Shop Minis SDK components, hooks, and native features",
      path: "/sdk-tests",
      emoji: "🛠️",
    },
    {
      title: "Third-Party Libraries",
      description:
        "Test supported third-party libraries like Lucide, Lodash, Zustand, etc.",
      path: "/libraries",
      emoji: "📚",
    },
    // {
    //   title: "AI & ML Libraries",
    //   description:
    //     "Test AI/ML libraries including TensorFlow, OpenAI SDK, and more",
    //   path: "/ai-ml",
    //   emoji: "🤖",
    // },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Kitchen Sink</h1>
        <p className="text-gray-600 mt-2">Shop Minis SDK Testing Ground</p>
      </div>

      {/* Navigation Cards */}
      <div className="flex-1 p-4 space-y-4">
        {navigationItems.map((item) => (
          <Touchable
            key={item.path}
            onClick={() => navigate(item.path)}
            className="bg-white rounded-lg border border-gray-200 p-6"
            style={{ minHeight: "48px" }} // Ensure touch target compliance
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl" role="img" aria-label={item.title}>
                {item.emoji}
              </span>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <span className="text-gray-400 mt-1">→</span>
            </div>
          </Touchable>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <p className="text-xs text-gray-500 text-center">
          Testing all {">"}50 supported libraries and SDK features
        </p>
      </div>
    </div>
  );
}
