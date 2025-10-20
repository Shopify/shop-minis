import {
  usePopularProducts,
  useNavigateWithTransition,
  ProductCard,
  Card,
  Skeleton,
  List,
  Badge,
  Touchable,
} from "@shopify/shop-minis-react";

export function PopularProductsTest() {
  const navigate = useNavigateWithTransition();
  const { products, loading, error, fetchMore } = usePopularProducts();

  const productRows = products
    ? Array.from({ length: Math.ceil(products.length / 2) }, (_, i) =>
        products.slice(i * 2, i * 2 + 2)
      )
    : [];

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
              usePopularProducts
            </h1>
            <p className="text-xs text-gray-600">Trending items right now</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Info Bar */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="primary">🔥 Popular</Badge>
              {products && (
                <span className="text-sm text-gray-600">
                  {products.length} products loaded
                </span>
              )}
            </div>
            {products && products.length > 0 && (
              <span className="text-xs text-gray-500">Scroll for more</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {/* Loading State */}
          {loading && !products && (
            <div className="p-4 space-y-4">
              <Card className="p-4">
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-full" />
              </Card>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="p-4">
                    <Skeleton className="h-32 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3" />
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-4">
              <Card className="p-4 border-red-200 bg-red-50">
                <h3 className="font-semibold text-red-900 mb-1">
                  Error Loading Products
                </h3>
                <p className="text-sm text-red-700">{error.message}</p>
              </Card>
            </div>
          )}

          {/* Products List */}
          {products && products.length > 0 && (
            <List
              items={productRows}
              height={600}
              showScrollbar={true}
              fetchMore={fetchMore}
              renderItem={(productRow) => (
                <div className="grid grid-cols-2 gap-4 p-4">
                  {productRow.map((product) => (
                    <div key={product.id} className="relative">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            />
          )}

          {/* Empty State */}
          {!loading && products && products.length === 0 && (
            <div className="p-4">
              <Card className="p-6 text-center">
                <p className="text-gray-500 mb-2">
                  No popular products available
                </p>
                <p className="text-sm text-gray-400">
                  Check back later for trending items
                </p>
              </Card>
            </div>
          )}
        </div>

        {/* Code Example Card */}
        {!loading && !error && (
          <div className="bg-white border-t border-gray-200 p-4">
            <details className="cursor-pointer">
              <summary className="text-sm font-medium text-gray-700">
                View Code Example
              </summary>
              <pre className="mt-3 text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                {`import { usePopularProducts } from '@shopify/shop-minis-react'

function PopularItems() {
  const { products, loading, fetchMore } = usePopularProducts()
  
  return (
    <List
      items={products}
      fetchMore={fetchMore}
      renderItem={product => 
        <ProductCard product={product} />
      }
    />
  )
}`}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
