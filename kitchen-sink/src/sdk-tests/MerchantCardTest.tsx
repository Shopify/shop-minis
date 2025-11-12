import { useState } from "react";
import {
  useNavigateWithTransition,
  useRecentShops,
  MerchantCard,
  Card,
  Badge,
  Alert,
  Button,
  Skeleton,
  Touchable,
} from "@shopify/shop-minis-react";

export function MerchantCardTest() {
  const navigate = useNavigateWithTransition();
  const { shops, loading, error } = useRecentShops();
  const [layoutMode, setLayoutMode] = useState<"single" | "double">("single");
  const [selectedMerchant, setSelectedMerchant] = useState<any>(null);

  const handleMerchantPress = (merchant: any) => {
    setSelectedMerchant(merchant);
    setTimeout(() => setSelectedMerchant(null), 3000);
  };

  const transformedShops = shops?.map((shop) => ({
    ...shop,
    visualTheme: {
      id: shop.visualTheme?.id || `vt-${shop.id}`,
      logoImage: shop.logoImage ? { ...shop.logoImage, sensitive: shop.logoImage.sensitive ?? false } : null,
      featuredImages: shop.visualTheme?.featuredImages || [],
      description: shop.visualTheme?.description,
      brandSettings: shop.visualTheme?.brandSettings,
    },
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="flex items-center px-4 py-3">
                    <Touchable
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg"
            style={{ minHeight: "48px", minWidth: "48px" }}
          >
            <span className="text-xl">←</span>
          </Touchable>
          <div className="flex-1 ml-2">
            <h1 className="text-lg font-bold text-gray-900">MerchantCard</h1>
            <p className="text-xs text-gray-600">
              SDK Component for Shop Display
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Selected Merchant Alert */}
        {selectedMerchant && (
          <div className="p-4">
            <Alert>
              Selected: {selectedMerchant.name}
              {selectedMerchant.reviewAnalytics?.averageRating && (
                <span>
                  {" "}
                  - Rating: {selectedMerchant.reviewAnalytics.averageRating} (
                  {selectedMerchant.reviewAnalytics.reviewCount || 0} reviews)
                </span>
              )}
            </Alert>
          </div>
        )}

        {/* Controls */}
        <div className="p-4 bg-white border-b">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2">
              <Button
                onClick={() => setLayoutMode("single")}
                variant={layoutMode === "single" ? "default" : "secondary"}
                size="sm"
              >
                Single Column
              </Button>
              <Button
                onClick={() => setLayoutMode("double")}
                variant={layoutMode === "double" ? "default" : "secondary"}
                size="sm"
              >
                Two Columns
              </Button>
            </div>
          </div>

          {/* Data Source Info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Recent Shops (with logo images)</span>
            {transformedShops && <Badge variant="primary">{transformedShops.length} shops</Badge>}
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive" className="mt-2">
              Error loading shops: {error.message}
            </Alert>
          )}
        </div>

        {/* Loading State */}
        {loading && !shops?.length && (
          <div className="p-4">
            <div
              className={`${
                layoutMode === "single" ? "space-y-4" : "grid grid-cols-2 gap-3"
              }`}
            >
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-32 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Merchant Cards */}
        {!loading && transformedShops && transformedShops.length > 0 && (
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Shops</h3>

            <div
              className={`${
                layoutMode === "single" ? "space-y-4" : "grid grid-cols-2 gap-3"
              }`}
            >
              {transformedShops.map((shop) => (
                <div key={shop.id} onClick={() => handleMerchantPress(shop)}>
                  <MerchantCard shop={shop} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && (!shops || shops.length === 0) && (
          <div className="p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">🏪</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Recent Shops
            </h3>
            <p className="text-gray-600">
              Browse some shops in the Shop app, then return here to see them.
            </p>
          </div>
        )}

        {/* Info Cards */}
        <div className="p-4 space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">
              MerchantCard Features
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Displays shop logo and cover image</p>
              <p>• Shows shop name and description</p>
              <p>• Product count and ratings</p>
              <p>• Follow/unfollow functionality</p>
              <p>• Verification badges</p>
              <p>• Category tags</p>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">Layout Options</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>✓ Single column layout for detailed view</p>
              <p>✓ Two column grid for compact display</p>
              <p>✓ Responsive design for mobile screens</p>
              <p>✓ Lazy loading with skeleton states</p>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">Integration</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>The MerchantCard component automatically handles:</p>
              <ul className="ml-4 space-y-1">
                <li>• Navigation to shop page on click</li>
                <li>• Shop follow/unfollow actions</li>
                <li>• Image optimization and lazy loading</li>
                <li>• Responsive layout adjustments</li>
                <li>• Accessibility features</li>
              </ul>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">Usage Example</h3>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
              {`import { MerchantCard, useRecentShops } from '@shopify/shop-minis-react'

function ShopList() {
  const { shops, loading, error } = useRecentShops()
  
  if (loading) return <Skeleton />
  if (error) return <Alert>{error.message}</Alert>
  
  return (
    <div className="space-y-4">
      {shops?.map(shop => (
        <MerchantCard key={shop.id} shop={shop} />
      ))}
    </div>
  )
}`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}
