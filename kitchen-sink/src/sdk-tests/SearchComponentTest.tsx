import { useState } from "react";
import {
  Search,
  useNavigateWithTransition,
  Card,
  Badge,
  ProductCard,
  useProductSearch,
  Touchable,
} from "@shopify/shop-minis-react";

export function SearchComponentTest() {
  const navigate = useNavigateWithTransition();
  const [searchQuery, setSearchQuery] = useState("");
  // Initialize with query param
  const { products, loading } = useProductSearch({ query: searchQuery });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSearchHistory((prev) => {
        const newHistory = [query, ...prev.filter((q) => q !== query)];
        return newHistory.slice(0, 10); // Keep last 10 searches
      });
    }
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

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
              Search Component
            </h1>
            <p className="text-xs text-gray-600">SDK Search UI component</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Search Bar Section */}
        <div className="bg-white p-4 border-b">
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">
              Search Products
            </h3>
            <Search initialQuery={searchQuery} />
          </Card>
        </div>

        <div className="p-4 space-y-4">
          {/* Search History */}
          {searchHistory.length > 0 && !loading && !products && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Recent Searches</h3>
                          <Touchable
                  onClick={handleClearHistory}
                  className="text-xs text-red-600 font-medium"
                >
                  Clear
                </Touchable>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((query, index) => (
                            <Touchable
                    key={index}
                    onClick={() => handleSearch(query)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm active:bg-gray-200"
                  >
                    {query}
                  </Touchable>
                ))}
              </div>
            </Card>
          )}

          {/* Results Count */}
          {products && products.length > 0 && (
            <div className="flex items-center justify-between px-2">
              <p className="text-sm text-gray-600">
                Found {products.length} products for "{searchQuery}"
              </p>
              <Badge variant="secondary">Results</Badge>
            </div>
          )}

          {/* Search Results */}
          {products && products.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* No Results */}
          {products && products.length === 0 && searchQuery && (
            <Card className="p-6 text-center">
              <p className="text-gray-500 mb-2">No results found</p>
              <p className="text-sm text-gray-400">
                Try searching for something else
              </p>
            </Card>
          )}

          {/* Component Features */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Component Features
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <p className="text-sm text-gray-600">
                  Auto-complete suggestions
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <p className="text-sm text-gray-600">Loading state indicator</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <p className="text-sm text-gray-600">
                  Clear button when typing
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <p className="text-sm text-gray-600">
                  Mobile-optimized keyboard
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <p className="text-sm text-gray-600">
                  Debounced search requests
                </p>
              </div>
            </div>
          </Card>

          {/* Usage Example */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Usage Example</h3>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
              {`import { Search } from '@shopify/shop-minis-react'

function ProductSearch() {
  const [query, setQuery] = useState('')
  
  return (
    <Search
      initialQuery={query}
      placeholder="Search products..."
      showSearchInput={true}
    />
  )
  
  // Search component handles:
  // - Search input UI
  // - Product search API calls
  // - Product results display
  // - Loading states
  // - Auto-suggestions
}`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}
