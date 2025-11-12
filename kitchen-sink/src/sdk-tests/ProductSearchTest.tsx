import { useState } from "react";
import {
  useProductSearch,
  useNavigateWithTransition,
  ProductCard,
  Input,
  Card,
  Skeleton,
  List,
  Touchable,
} from "@shopify/shop-minis-react";

export function ProductSearchTest() {
  const navigate = useNavigateWithTransition();
  const [searchQuery, setSearchQuery] = useState("");

  // useProductSearch requires params object with query field
  const { products, loading, error, fetchMore, isTyping } = useProductSearch({
    query: searchQuery,
  });

  const handleSearch = () => {
    // The hook automatically handles search when query changes
  };

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
              useProductSearch
            </h1>
            <p className="text-xs text-gray-600">Search for products</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search for products..."
              className="flex-1"
            />
            {isTyping && (
              <span className="text-sm text-gray-500 self-center">
                Typing...
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {/* Loading State */}
          {loading && (
            <div className="p-4 space-y-4">
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
                  Search Error
                </h3>
                <p className="text-sm text-red-700">{error.message}</p>
              </Card>
            </div>
          )}

          {/* No Results */}
          {!loading &&
            !error &&
            products &&
            products.length === 0 &&
            searchQuery && (
              <div className="p-4">
                <Card className="p-6 text-center">
                  <p className="text-gray-500 mb-2">No products found for</p>
                  <p className="font-semibold text-gray-900">"{searchQuery}"</p>
                  <p className="text-sm text-gray-500 mt-4">
                    Try searching for something else
                  </p>
                </Card>
              </div>
            )}

          {/* Results */}
          {!loading && products && products.length > 0 && (
            <div className="flex-1">
              <div className="px-4 py-2">
                <p className="text-sm text-gray-600">
                  Found {products.length} products
                </p>
              </div>
              <List
                items={productRows}
                height={500}
                showScrollbar={true}
                fetchMore={fetchMore}
                renderItem={(productRow) => (
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {productRow.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              />
            </div>
          )}

          {/* Initial State */}
          {!loading && !products && (
            <div className="p-4 space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900">
                  Try Searching!
                </h3>
                <p className="text-sm text-gray-600">
                  Enter a search term above to find products. Try searching for:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Shoes", "Bags", "Electronics", "Clothing"].map(
                    (suggestion) => (
                                <Touchable
                        key={suggestion}
                        onClick={() => {
                          setSearchQuery(suggestion);
                        }}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm active:bg-gray-200"
                      >
                        {suggestion}
                      </Touchable>
                    )
                  )}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-gray-900">
                  Usage Example
                </h3>
                <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                  {`import { useProductSearch } from '@shopify/shop-minis-react'

function SearchProducts() {
  const [query, setQuery] = useState("")
  const { products, loading, isTyping } = useProductSearch({
    query: query,
    // optional: filters, sortBy, includeSensitive
  })
  
  return (
    <div>
      <Input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      {isTyping && <span>Searching...</span>}
      {products?.map(product => 
        <ProductCard product={product} />
      )}
    </div>
  )
}`}
                </pre>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
