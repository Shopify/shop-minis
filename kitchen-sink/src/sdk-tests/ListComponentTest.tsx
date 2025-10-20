import { useState, useCallback } from "react";
import {
  useNavigateWithTransition,
  List,
  Card,
  Button,
  Badge,
  Alert,
  Input,
  Touchable,
  Image,
} from "@shopify/shop-minis-react";

// Generate large dataset for testing virtualization
const generateMockData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `item-${index}`,
    title: `Product ${index + 1}`,
    description: `This is a description for product ${
      index + 1
    }. It contains some text to make the item more realistic.`,
    price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
    category: ["Electronics", "Clothing", "Home", "Sports", "Books"][
      Math.floor(Math.random() * 5)
    ],
    inStock: Math.random() > 0.2,
    rating: (Math.random() * 2 + 3).toFixed(1),
    image: `https://placehold.co/100x100/4F46E5/ffffff?text=${index + 1}`,
  }));
};

export function ListComponentTest() {
  const navigate = useNavigateWithTransition();
  const [itemCount, setItemCount] = useState(1000);
  const [customCount, setCustomCount] = useState("1000");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [listMode, setListMode] = useState<"vertical" | "horizontal">(
    "vertical"
  );
  const [itemHeight, setItemHeight] = useState(100);

  const mockData = generateMockData(itemCount);

  const handleUpdateCount = () => {
    const count = parseInt(customCount);
    if (count > 0 && count <= 10000) {
      setItemCount(count);
    }
  };

  // Render function for list items
  const renderItem = useCallback(
    (item: any, index: number) => {
      return (
        <div
          className="flex items-center gap-3 p-3 bg-white border-b border-gray-100 active:bg-gray-50"
          onClick={() => setSelectedItem(item)}
          style={{ minHeight: `${itemHeight}px` }}
        >
          <Image
            src={item.image}
            alt={item.title}
            className="w-16 h-16 rounded-lg flex-shrink-0"
            aspectRatio="1"
            objectFit="cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {item.title}
              </h3>
              <Badge
                variant={item.inStock ? "primary" : "secondary"}
                className="text-xs"
              >
                {item.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 line-clamp-2 mt-1">
              {item.description}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="font-bold text-blue-600">{item.price}</span>
              <span className="text-xs text-gray-500">{item.category}</span>
              <span className="text-xs text-gray-500">⭐ {item.rating}</span>
            </div>
          </div>
          <div className="text-gray-400">
            <span className="text-xs">#{index + 1}</span>
          </div>
        </div>
      );
    },
    [itemHeight]
  );

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
            <h1 className="text-lg font-bold text-gray-900">List Component</h1>
            <p className="text-xs text-gray-600">
              Virtualized list for performance
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Selected Item Alert */}
        {selectedItem && (
          <div className="p-4">
            <Alert>
              Selected: {selectedItem.title} - {selectedItem.price}
            </Alert>
          </div>
        )}

        {/* Controls */}
        <div className="p-4 bg-white border-b space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Items:</span>
              <Badge variant="primary">{itemCount.toLocaleString()}</Badge>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setListMode("vertical")}
                variant={listMode === "vertical" ? "default" : "secondary"}
                size="sm"
              >
                Vertical
              </Button>
              <Button
                onClick={() => setListMode("horizontal")}
                variant={listMode === "horizontal" ? "default" : "secondary"}
                size="sm"
              >
                Horizontal
              </Button>
            </div>
          </div>

          {/* Item Count Control */}
          <div className="flex gap-2">
            <Input
              type="number"
              value={customCount}
              onChange={(e) => setCustomCount(e.target.value)}
              placeholder="Number of items (max 10000)"
              className="flex-1"
            />
            <Button onClick={handleUpdateCount} variant="default">
              Update
            </Button>
          </div>

          {/* Quick Options */}
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setItemCount(100);
                setCustomCount("100");
              }}
              variant="outline"
              size="sm"
            >
              100 items
            </Button>
            <Button
              onClick={() => {
                setItemCount(500);
                setCustomCount("500");
              }}
              variant="outline"
              size="sm"
            >
              500 items
            </Button>
            <Button
              onClick={() => {
                setItemCount(1000);
                setCustomCount("1000");
              }}
              variant="outline"
              size="sm"
            >
              1000 items
            </Button>
            <Button
              onClick={() => {
                setItemCount(5000);
                setCustomCount("5000");
              }}
              variant="outline"
              size="sm"
            >
              5000 items
            </Button>
          </div>

          {listMode === "vertical" && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Item Height:</span>
              <input
                type="range"
                min="80"
                max="150"
                value={itemHeight}
                onChange={(e) => setItemHeight(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600">{itemHeight}px</span>
            </div>
          )}
        </div>

        {/* Virtualized List */}
        <div className="flex-1 overflow-hidden bg-gray-50">
          {listMode === "vertical" ? (
            <div style={{ height: "100%" }}>
              <List items={mockData} renderItem={renderItem} height={500} />
            </div>
          ) : (
            <div className="h-full p-4">
              <p className="text-center text-gray-600">
                Note: Horizontal scrolling is not directly supported by the List
                component. Use a horizontal ScrollView with custom rendering for
                horizontal lists.
              </p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-4 bg-white border-t space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Performance Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Only renders visible items (virtualization)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Handles thousands of items smoothly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Recycled item views for memory efficiency</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Supports both vertical and horizontal scrolling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Touch-optimized scrolling</span>
              </li>
            </ul>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Usage Example</h3>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
              {`import { List } from '@shopify/shop-minis-react'

function ProductList({ products }) {
  const renderItem = (item, index) => (
    <div className="p-4 border-b">
      <h3>{item.title}</h3>
      <p>{item.price}</p>
    </div>
  )

  return (
    <List
      items={products}
      renderItem={renderItem}
      fetchMore={() => loadMore()}
    />
  )
}`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}
