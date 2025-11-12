import {
  useNavigateWithTransition,
  Touchable,
} from "@shopify/shop-minis-react";

export function SDKTestsPage() {
  const navigate = useNavigateWithTransition();

  const sdkTests = [
    // Core Hooks
    {
      name: "useCurrentUser",
      path: "/sdk-tests/current-user",
      category: "User",
    },
    {
      name: "useGenerateUserToken",
      path: "/sdk-tests/generate-token",
      category: "Auth",
    },

    // Product & Commerce
    {
      name: "useProductSearch",
      path: "/sdk-tests/product-search",
      category: "Products",
    },
    {
      name: "usePopularProducts",
      path: "/sdk-tests/popular-products",
      category: "Products",
    },
    {
      name: "Cart Action Buttons",
      path: "/sdk-tests/cart-actions",
      category: "Cart",
    },
    {
      name: "useShopNavigation",
      path: "/sdk-tests/shop-navigation",
      category: "Navigation",
    },

    // Storage
    {
      name: "useAsyncStorage",
      path: "/sdk-tests/async-storage",
      category: "Storage",
    },
    {
      name: "useSecureStorage",
      path: "/sdk-tests/secure-storage",
      category: "Storage",
    },

    // Media & Camera
    {
      name: "useImagePicker",
      path: "/sdk-tests/image-picker",
      category: "Media",
    },
    {
      name: "Camera Access",
      path: "/sdk-tests/camera-access",
      category: "Media",
    },
    {
      name: "Image Component",
      path: "/sdk-tests/image-component",
      category: "Media",
    },
    { name: "VideoPlayer", path: "/sdk-tests/video-player", category: "Media" },

    // UI Components
    { name: "Search Component", path: "/sdk-tests/search", category: "UI" },
    { name: "ProductCard", path: "/sdk-tests/product-card", category: "UI" },
    { name: "MerchantCard", path: "/sdk-tests/merchant-card", category: "UI" },
    {
      name: "List Component",
      path: "/sdk-tests/list-component",
      category: "UI",
    },
    { name: "Alert & Badge", path: "/sdk-tests/alert-badge", category: "UI" },
    { name: "Input & Label", path: "/sdk-tests/label-input", category: "UI" },
    { name: "Skeleton", path: "/sdk-tests/skeleton", category: "UI" },
    { name: "Button Variants", path: "/sdk-tests/buttons", category: "UI" },
  ];

  const groupedTests = sdkTests.reduce((acc, test) => {
    if (!acc[test.category]) {
      acc[test.category] = [];
    }
    acc[test.category].push(test);
    return acc;
  }, {} as Record<string, typeof sdkTests>);

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
            <h1 className="text-lg font-bold text-gray-900">SDK Tests</h1>
            <p className="text-xs text-gray-600">
              Shop Minis SDK Components & Hooks
            </p>
          </div>
        </div>
      </div>

      {/* Test Categories */}
      <div className="flex-1 p-4">
        {Object.entries(groupedTests).map(([category, tests]) => (
          <div key={category} className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              {category}
            </h2>
            <div className="space-y-2">
              {tests.map((test) => (
                <Touchable
                  key={test.path}
                  onClick={() => navigate(test.path)}
                  className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center justify-between"
                  style={{ minHeight: "48px" }}
                >
                  <span className="text-gray-900 font-medium">{test.name}</span>
                  <span className="text-gray-400">→</span>
                </Touchable>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
