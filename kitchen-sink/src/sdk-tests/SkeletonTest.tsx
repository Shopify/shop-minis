import { useState } from "react";
import {
  useNavigateWithTransition,
  Card,
  Button,
  Skeleton,
  Touchable,
  Image,
} from "@shopify/shop-minis-react";

export function SkeletonTest() {
  const navigate = useNavigateWithTransition();
  const [loading, setLoading] = useState(true);

  const toggleLoading = () => {
    setLoading(!loading);
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
            <h1 className="text-lg font-bold text-gray-900">Skeleton</h1>
            <p className="text-xs text-gray-600">Loading state placeholders</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Controls */}
        <div className="p-4 bg-white border-b">
          <div className="flex gap-2">
            <Button onClick={toggleLoading} variant="default">
              {loading ? "Show Content" : "Show Skeletons"}
            </Button>
            <Button onClick={simulateLoading} variant="secondary">
              Simulate 2s Load
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Text Skeletons */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">Text Content</h3>

            {loading ? (
              <div className="space-y-3">
                {/* Title skeleton */}
                <Skeleton className="h-7 w-3/4" />

                {/* Paragraph skeletons */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Small text */}
                <div className="space-y-1 mt-4">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900">
                  Welcome to Our Store
                </h2>
                <p className="text-gray-600">
                  Discover amazing products at unbeatable prices. We offer a
                  wide selection of high-quality items to meet all your needs.
                  Shop with confidence knowing you're getting the best value.
                </p>
                <div className="space-y-1 mt-4">
                  <p className="text-xs text-gray-500">Updated today</p>
                  <p className="text-xs text-gray-500">2 min read</p>
                </div>
              </div>
            )}
          </Card>

          {/* Product Card Skeleton */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">Product Cards</h3>

            <div className="grid grid-cols-2 gap-3">
              {loading ? (
                <>
                  {/* Product skeleton 1 */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Skeleton className="aspect-square" />
                    <div className="p-3 space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  </div>

                  {/* Product skeleton 2 */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Skeleton className="aspect-square" />
                    <div className="p-3 space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src="https://placehold.co/200/4F46E5/ffffff?text=Product+1"
                      alt="Product 1"
                      className="w-full"
                      aspectRatio="1"
                      objectFit="cover"
                    />
                    <div className="p-3">
                      <p className="text-xs text-gray-500">Electronics</p>
                      <h4 className="font-medium text-gray-900 text-sm">
                        Wireless Headphones
                      </h4>
                      <p className="font-bold text-blue-600 mt-1">$79.99</p>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src="https://placehold.co/200/10B981/ffffff?text=Product+2"
                      alt="Product 2"
                      className="w-full"
                      aspectRatio="1"
                      objectFit="cover"
                    />
                    <div className="p-3">
                      <p className="text-xs text-gray-500">Clothing</p>
                      <h4 className="font-medium text-gray-900 text-sm">
                        Cotton T-Shirt
                      </h4>
                      <p className="font-bold text-blue-600 mt-1">$29.99</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* User Profile Skeleton */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">User Profile</h3>

            {loading ? (
              <div className="flex items-start gap-4">
                {/* Avatar skeleton */}
                <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />

                {/* Profile info skeleton */}
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <div className="flex gap-4 mt-3">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <Image
                  src="https://placehold.co/64/8B5CF6/ffffff?text=JD"
                  alt="Avatar"
                  className="w-16 h-16 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">John Doe</h4>
                  <p className="text-sm text-gray-600">john.doe@example.com</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>100 Orders</span>
                    <span>Member Since 2023</span>
                    <span>Gold Status</span>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* List Items Skeleton */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">List Items</h3>

            <div className="space-y-3">
              {loading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 border border-gray-100 rounded"
                    >
                      <Skeleton className="w-12 h-12 rounded" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <Skeleton className="w-16 h-8 rounded" />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {[
                    {
                      title: "Order #1234",
                      status: "Delivered",
                      price: "$99.99",
                    },
                    {
                      title: "Order #1235",
                      status: "Shipped",
                      price: "$149.99",
                    },
                    {
                      title: "Order #1236",
                      status: "Processing",
                      price: "$79.99",
                    },
                  ].map((order, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 border border-gray-100 rounded"
                    >
                      <div className="w-12 h-12 rounded bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">
                          #{i + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {order.title}
                        </p>
                        <p className="text-sm text-gray-600">{order.status}</p>
                      </div>
                      <span className="font-bold text-blue-600">
                        {order.price}
                      </span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </Card>

          {/* Custom Shapes */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">Custom Shapes</h3>

            {loading ? (
              <div className="space-y-4">
                {/* Circle */}
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <span className="text-sm text-gray-600">Circle skeleton</span>
                </div>

                {/* Square */}
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <span className="text-sm text-gray-600">Square skeleton</span>
                </div>

                {/* Wide rectangle */}
                <div className="space-y-2">
                  <span className="text-sm text-gray-600">Banner skeleton</span>
                  <Skeleton className="h-24 w-full rounded-lg" />
                </div>

                {/* Multiple columns */}
                <div className="grid grid-cols-3 gap-2">
                  <Skeleton className="h-20 rounded" />
                  <Skeleton className="h-20 rounded" />
                  <Skeleton className="h-20 rounded" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    ✓
                  </div>
                  <span className="text-sm text-gray-600">Verified badge</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center text-white">
                    📦
                  </div>
                  <span className="text-sm text-gray-600">Package icon</span>
                </div>

                <div className="space-y-2">
                  <span className="text-sm text-gray-600">
                    Promotional banner
                  </span>
                  <div className="h-24 w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    50% OFF SALE
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="h-20 rounded bg-red-100 flex items-center justify-center">
                    1
                  </div>
                  <div className="h-20 rounded bg-green-100 flex items-center justify-center">
                    2
                  </div>
                  <div className="h-20 rounded bg-blue-100 flex items-center justify-center">
                    3
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Animation Example */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">
              Pulse Animation
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Skeletons have a subtle pulse animation by default
            </p>

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-3/6" />
            </div>
          </Card>

          {/* Usage Example */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">Usage Example</h3>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
              {`import { Skeleton } from '@shopify/shop-minis-react'

function LoadingState() {
  const [loading, setLoading] = useState(true)

  return (
    <div>
      {loading ? (
        <>
          {/* Text skeleton */}
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
          
          {/* Card skeleton */}
          <div className="border rounded p-4">
            <Skeleton className="h-40 w-full mb-3" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-5 w-20" />
          </div>
          
          {/* Avatar skeleton */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </>
      ) : (
        <div>
          {/* Actual content */}
        </div>
      )}
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
