import { useState } from "react";
import {
  useNavigateWithTransition,
  usePopularProducts,
  ProductCard,
  Card,
  Badge,
  Alert,
  Button,
  Skeleton,
  Touchable,
} from "@shopify/shop-minis-react";

export function ProductCardTest() {
  const navigate = useNavigateWithTransition();
  const { products, loading, error } = usePopularProducts();
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setTimeout(() => setSelectedProduct(null), 3000);
  };

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
            <h1 className="text-lg font-bold text-gray-900">ProductCard</h1>
            <p className="text-xs text-gray-600">
              SDK Component for Product Display
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Selected Product Alert */}
        {selectedProduct && (
          <div className="p-4">
            <Alert>
              Selected: {selectedProduct.title} - $
              {selectedProduct.priceRange?.minVariantPrice?.amount || "N/A"}
            </Alert>
          </div>
        )}

        {/* Controls */}
        <div className="p-4 bg-white border-b">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2">
              <Button
                onClick={() => setLayoutMode("grid")}
                variant={layoutMode === "grid" ? "default" : "secondary"}
                size="sm"
              >
                Grid View
              </Button>
              <Button
                onClick={() => setLayoutMode("list")}
                variant={layoutMode === "list" ? "default" : "secondary"}
                size="sm"
              >
                List View
              </Button>
            </div>
          </div>

          {/* Data Source Info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Popular Products from Shop</span>
            {products && (
              <Badge variant="primary">{products.length} products</Badge>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive" className="mt-2">
              Error loading products: {error.message}
            </Alert>
          )}
        </div>

        {/* Loading State */}
        {loading && !products?.length && (
          <div className="p-4">
            <div
              className={`${
                layoutMode === "grid" ? "grid grid-cols-2 gap-3" : "space-y-3"
              }`}
            >
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-square" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Product Cards - Grid Layout */}
        {!loading &&
          products &&
          products.length > 0 &&
          layoutMode === "grid" && (
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Grid Layout (2 columns)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Product Cards - List Layout */}
        {!loading &&
          products &&
          products.length > 0 &&
          layoutMode === "list" && (
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                List Layout (Single column)
              </h3>
              <div className="space-y-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Empty State */}
        {!loading && !error && (!products || products.length === 0) && (
          <div className="p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-600">
              Popular products will appear here when available.
            </p>
          </div>
        )}

        {/* Product States Demo */}
        <div className="p-4 space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Product States</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• The SDK ProductCard handles all product states</p>
              <p>• Displays pricing, variants, and availability</p>
              <p>• Handles sale badges and discount pricing</p>
              <p>• Shows vendor information</p>
              <p>• Manages product images with fallbacks</p>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>✓ Responsive grid and list layouts</p>
              <p>✓ Lazy loading with skeleton states</p>
              <p>✓ Load more pagination</p>
              <p>✓ Click interaction tracking</p>
              <p>✓ Automatic error handling</p>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Usage Notes</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                The ProductCard component from @shopify/shop-minis-react
                automatically handles:
              </p>
              <ul className="ml-4 space-y-1">
                <li>• Product navigation on click</li>
                <li>• Price formatting and currency</li>
                <li>• Image optimization and lazy loading</li>
                <li>• Variant selection UI</li>
                <li>• Add to cart actions</li>
                <li>• Wishlist/favorite actions</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
