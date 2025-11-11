import { useState } from "react";
import {
  ProductLink,
  useProductSearch,
  Button,
} from "@shopify/shop-minis-react";

export function ProductSearch() {
  const [query, setQuery] = useState("shirt");
  const [searchQuery, setSearchQuery] = useState("shirt");
  const { products, loading, error } = useProductSearch({ query: searchQuery });

  const handleSearch = () => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Product Search</h3>

      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} variant="default">
          Search
        </Button>
      </div>

      {loading && (
        <p className="text-blue-600">Searching for "{searchQuery}"...</p>
      )}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      <div className="space-y-3">
        {products && products.length > 0 ? (
          <>
            <p className="text-sm text-gray-600">
              {products.length} results for "{searchQuery}"
            </p>
            {products.slice(0, 5).map((product: any) => (
              <ProductLink key={product.id} product={product} />
            ))}
          </>
        ) : (
          !loading && (
            <p className="text-gray-500">
              No products found for "{searchQuery}"
            </p>
          )
        )}
      </div>

      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Response
        </summary>
        <div className="p-4 pt-0">
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
}
