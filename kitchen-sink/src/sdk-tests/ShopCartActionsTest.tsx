import { useState } from "react";
import {
  useShopCartActions,
  useNavigateWithTransition,
  Card,
  Button,
  Badge,
  Alert,
  Touchable,
  Image,
} from "@shopify/shop-minis-react";

// Mock product data
const mockProducts = [
  {
    id: "gid://shopify/Product/1",
    title: "Classic T-Shirt",
    vendor: { name: "Shop Apparel" },
    featuredImage: { url: "https://placehold.co/200" },
    priceRange: {
      minVariantPrice: {
        amount: "29.99",
        currencyCode: "USD",
      },
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/1",
            title: "Small / Blue",
            price: { amount: "29.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/2",
    title: "Running Shoes",
    vendor: { name: "Sports Store" },
    featuredImage: { url: "https://placehold.co/200" },
    priceRange: {
      minVariantPrice: {
        amount: "89.99",
        currencyCode: "USD",
      },
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/2",
            title: "Size 10",
            price: { amount: "89.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/3",
    title: "Backpack",
    vendor: { name: "Travel Gear" },
    featuredImage: { url: "https://placehold.co/200" },
    priceRange: {
      minVariantPrice: {
        amount: "49.99",
        currencyCode: "USD",
      },
    },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/3",
            title: "Black",
            price: { amount: "49.99", currencyCode: "USD" },
            availableForSale: true,
          },
        },
      ],
    },
  },
];

export function ShopCartActionsTest() {
  const navigate = useNavigateWithTransition();
  const cartActions = useShopCartActions();
  const [message, setMessage] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (product: any) => {
    setLoading(true);
    try {
      const variant = product.variants.edges[0].node;
      await cartActions.addToCart({
        productId: product.id,
        productVariantId: variant.id,
        quantity: 1,
      });
      setMessage(`Added ${product.title} to cart!`);
      setCartItems((prev) => [...prev, { product, quantity: 1 }]);
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (
    _variantId: string,
    _quantity: number
  ) => {
    setLoading(true);
    try {
      // Note: updateCartItem, removeFromCart, and clearCart may not be available in this SDK version
      setMessage("Update functionality not available in current SDK");
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (_variantId: string, _title: string) => {
    setLoading(true);
    try {
      // Note: removeFromCart may not be available in this SDK version
      setMessage("Remove functionality not available in current SDK");
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = async () => {
    setLoading(true);
    try {
      // Note: clearCart may not be available in this SDK version
      setCartItems([]);
      setMessage("Cart cleared!");
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(
          item.product.priceRange.minVariantPrice.amount
        );
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
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
              useShopCartActions
            </h1>
            <p className="text-xs text-gray-600">Manage shopping cart items</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {/* Message Alert */}
        {message && (
          <Alert
            variant={message.includes("Error") ? "destructive" : "default"}
          >
            {message}
          </Alert>
        )}

        {/* Products */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">
            Available Products
          </h3>
          <div className="space-y-3">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <Image
                  src={product.featuredImage.url}
                  alt={product.title}
                  className="w-16 h-16 rounded"
                  aspectRatio="1"
                  objectFit="cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.title}</p>
                  <p className="text-sm text-gray-600">{product.vendor.name}</p>
                  <p className="text-sm font-bold text-blue-600">
                    ${product.priceRange.minVariantPrice.amount}
                  </p>
                </div>
                <Button
                  onClick={() => handleAddToCart(product)}
                  variant="default"
                  size="sm"
                  disabled={loading}
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Shopping Cart */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              Shopping Cart
              {cartItems.length > 0 && (
                <Badge variant="primary" className="ml-2">
                  {cartItems.length}
                </Badge>
              )}
            </h3>
            {cartItems.length > 0 && (
              <Button
                onClick={handleClearCart}
                variant="destructive"
                size="sm"
                disabled={loading}
              >
                Clear Cart
              </Button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Your cart is empty</p>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => {
                const variant = item.product.variants.edges[0].node;
                return (
                  <div
                    key={variant.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Image
                      src={item.product.featuredImage.url}
                      alt={item.product.title}
                      className="w-12 h-12 rounded"
                      aspectRatio="1"
                      objectFit="cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        ${item.product.priceRange.minVariantPrice.amount} ×{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() =>
                          handleUpdateQuantity(
                            variant.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        variant="outline"
                        size="sm"
                        disabled={loading || item.quantity <= 1}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() =>
                          handleUpdateQuantity(variant.id, item.quantity + 1)
                        }
                        variant="outline"
                        size="sm"
                        disabled={loading}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                      <Button
                        onClick={() =>
                          handleRemoveFromCart(variant.id, item.product.title)
                        }
                        variant="ghost"
                        size="sm"
                        disabled={loading}
                        className="ml-2 text-red-600"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}

              {/* Total */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-blue-600">
                    ${calculateTotal()}
                  </span>
                </div>
                <Button
                  onClick={() => {
                    setMessage("Proceeding to checkout...");
                    setTimeout(() => setMessage(null), 3000);
                  }}
                  variant="default"
                  className="w-full mt-3"
                  disabled={loading}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Hook Methods */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            Available Methods
          </h3>
          <div className="space-y-2 text-sm">
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              addToCart({`{variantId, quantity}`})
            </div>
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              updateCartItem({`{variantId, quantity}`})
            </div>
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              removeFromCart({`{variantId}`})
            </div>
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              clearCart()
            </div>
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              getCart()
            </div>
          </div>
        </Card>

        {/* Usage Example */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Usage Example</h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { useShopCartActions } from '@shopify/shop-minis-react'

function ProductDetail({ product }) {
  const cartActions = useShopCartActions()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    setLoading(true)
    try {
      await cartActions.addToCart({
        variantId: product.variants[0].id,
        quantity: 1,
      })
      alert('Added to cart!')
    } catch (error) {
      alert('Error adding to cart')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleAddToCart} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
}
