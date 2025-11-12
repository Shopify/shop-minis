import {
  AddToCartButton,
  BuyNowButton,
  useNavigateWithTransition,
  usePopularProducts,
  Card,
  Touchable,
  Image,
  Skeleton,
  Alert,
} from "@shopify/shop-minis-react";

export function ShopCartActionsTest() {
  const navigate = useNavigateWithTransition();
  const { products, loading: isLoading, error } = usePopularProducts({ first: 6 });

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
              Cart Action Buttons
            </h1>
            <p className="text-xs text-gray-600">
              AddToCartButton & BuyNowButton
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {/* Introduction */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">
            About Cart Action Buttons
          </h3>
          <p className="text-sm text-gray-600">
            The SDK provides pre-built buttons for adding products to cart and
            buying products directly. These components handle all the cart
            logic internally and provide consistent UX across all Shop Minis.
          </p>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="p-4">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-16 h-16 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-10 w-24" />
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive">
            Failed to load products: {error.message}
          </Alert>
        )}

        {/* Products with AddToCartButton */}
        {products && products.length > 0 && (
          <>
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">
                AddToCartButton Examples
              </h3>
              <p className="text-sm text-gray-600">
                These buttons add items to the cart without navigating away from
                your mini.
              </p>
              <div className="space-y-3">
                {products.slice(0, 3).map((product: any) => {
                  const variantId = product.defaultVariantId;
                  return (
                    <div
                      key={product.id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {product.featuredImage && (
                          <Image
                            src={product.featuredImage.url}
                            alt={product.title}
                            className="w-16 h-16 rounded"
                            aspectRatio="1"
                            objectFit="cover"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {product.shop.name}
                          </p>
                          <p className="text-sm font-bold text-blue-600">
                            {product.price.formattedAmount}
                          </p>
                        </div>
                      </div>
                      <AddToCartButton
                        product={product}
                        productVariantId={variantId}
                      />
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Products with BuyNowButton */}
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900">
                BuyNowButton Examples
              </h3>
              <p className="text-sm text-gray-600">
                These buttons add items to cart and immediately navigate to
                checkout.
              </p>
              <div className="space-y-3">
                {products.slice(3, 6).map((product: any) => {
                  const variantId = product.defaultVariantId;
                  return (
                    <div
                      key={product.id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {product.featuredImage && (
                          <Image
                            src={product.featuredImage.url}
                            alt={product.title}
                            className="w-16 h-16 rounded"
                            aspectRatio="1"
                            objectFit="cover"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {product.shop.name}
                          </p>
                          <p className="text-sm font-bold text-blue-600">
                            {product.price.formattedAmount}
                          </p>
                        </div>
                      </div>
                      <BuyNowButton
                        product={product}
                        productVariantId={variantId}
                      />
                    </div>
                  );
                })}
              </div>
            </Card>
          </>
        )}

        {/* Props Documentation */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">Component Props</h3>
          <div className="space-y-2 text-sm">
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              product: Product (required)
            </div>
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              productVariantId: string (required)
            </div>
            <p className="text-sm text-gray-600 mt-3">
              These buttons handle all cart logic internally. BuyNowButton adds
              to cart and navigates to checkout immediately.
            </p>
          </div>
        </Card>

        {/* Usage Example - AddToCartButton */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">
            AddToCartButton Usage
          </h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { AddToCartButton } from '@shopify/shop-minis-react'

function ProductDetail({ product }) {
  return (
    <AddToCartButton 
      product={product}
      productVariantId={product.defaultVariantId}
    />
  )
}`}
          </pre>
        </Card>

        {/* Usage Example - BuyNowButton */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">
            BuyNowButton Usage
          </h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { BuyNowButton } from '@shopify/shop-minis-react'

function ProductDetail({ product }) {
  return (
    <BuyNowButton 
      product={product}
      productVariantId={product.defaultVariantId}
    />
  )
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
}
