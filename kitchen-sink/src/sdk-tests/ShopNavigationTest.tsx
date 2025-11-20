import { useState } from "react";
import {
  useShopNavigation,
  useNavigateWithTransition,
  Card,
  Button,
  Input,
  Touchable,
  Label,
} from "@shopify/shop-minis-react";

export function ShopNavigationTest() {
  const navigate = useNavigateWithTransition();
  const shopNav = useShopNavigation();
  const [productId, setProductId] = useState(
    "gid://shopify/Product/9158436028667"
  );
  const [shopId, setShopId] = useState("gid://shopify/Shop/86836871454");
  const [orderId, setOrderId] = useState("gid://shopify/Order/456");
  const [checkoutShopId, setCheckoutShopId] = useState(
    "gid://shopify/Shop/86836871454"
  );
  const handleNavigation = (action: string, destination: string) => {
    console.log(`Shop Navigation: ${action} -> ${destination}`);
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
              useShopNavigation
            </h1>
            <p className="text-xs text-gray-600">
              Navigate to Shop app screens
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {/* Cart Navigation */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">Cart Navigation</h3>
          <Button
            variant="default"
            onClick={() => {
              shopNav.navigateToCart();
              handleNavigation("navigateToCart", "Shopping Cart");
            }}
            className="w-full"
          >
            <span className="flex items-center justify-center gap-2">
              <span>🛒</span>
              <span>Go to Cart</span>
            </span>
          </Button>
        </Card>

        {/* Product Navigation */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">
            Product Navigation
          </h3>
          <div className="space-y-3">
            <div>
              <Label>Product ID (GID)</Label>
              <Input
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="gid://shopify/Product/..."
                className="mt-1"
              />
            </div>
            <Button
              variant="default"
              onClick={() => {
                if (productId) {
                  shopNav.navigateToProduct({ productId: productId });
                  handleNavigation("navigateToProduct", `Product ${productId}`);
                }
              }}
              className="w-full"
              disabled={!productId}
            >
              View Product
            </Button>
          </div>
        </Card>

        {/* Shop Navigation */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">Shop Navigation</h3>
          <div className="space-y-3">
            <div>
              <Label>Shop ID (GID)</Label>
              <Input
                value={shopId}
                onChange={(e) => setShopId(e.target.value)}
                placeholder="gid://shopify/Shop/..."
                className="mt-1"
              />
            </div>
            <Button
              variant="default"
              onClick={() => {
                if (shopId) {
                  shopNav.navigateToShop({ shopId: shopId });
                  handleNavigation("navigateToShop", `Shop ${shopId}`);
                }
              }}
              className="w-full"
              disabled={!shopId}
            >
              View Shop
            </Button>
          </div>
        </Card>

        {/* Order Navigation */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">Order Navigation</h3>
          <div className="space-y-3">
            <div>
              <Label>Order ID (GID)</Label>
              <Input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="gid://shopify/Order/..."
                className="mt-1"
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                if (orderId) {
                  shopNav.navigateToOrder({ orderId: orderId });
                  handleNavigation("navigateToOrder", `Order ${orderId}`);
                }
              }}
              className="w-full"
              disabled={!orderId}
            >
              View Order
            </Button>
          </div>
        </Card>

        {/* Checkout Navigation */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">
            Checkout Navigation
          </h3>
          <div className="space-y-3">
            <div>
              <Label>Shop ID for Checkout</Label>
              <Input
                value={checkoutShopId}
                onChange={(e) => setCheckoutShopId(e.target.value)}
                placeholder="gid://shopify/Shop/..."
                className="mt-1"
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                if (checkoutShopId) {
                  shopNav.navigateToCheckout({ shopId: checkoutShopId });
                  handleNavigation(
                    "navigateToCheckout",
                    `Checkout for shop ${checkoutShopId}`
                  );
                }
              }}
              className="w-full"
              disabled={!checkoutShopId}
            >
              Go to Checkout
            </Button>
          </div>
        </Card>

        {/* Available Methods */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">
            Available Methods
          </h3>
          <div className="space-y-2 text-sm">
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              navigateToProduct({`{productId: string}`})
            </div>
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              navigateToShop({`{shopId: string}`})
            </div>
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              navigateToOrder({`{orderId: string}`})
            </div>
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              navigateToCheckout({`{shopId: string}`})
            </div>
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              navigateToCart()
            </div>
          </div>
        </Card>

        {/* Usage Example */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">Usage Example</h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { useShopNavigation } from '@shopify/shop-minis-react'

function ProductActions({ product }) {
  const shopNav = useShopNavigation()
  
  return (
    <div>
      <Button onClick={() => shopNav.navigateToProduct({ 
        productId: product.id 
      })}>
        View in Shop
      </Button>
      
      <Button onClick={() => shopNav.navigateToCart()}>
        Go to Cart
      </Button>
      
      <Button onClick={() => shopNav.navigateToShop({ 
        shopId: product.vendor.id 
      })}>
        Visit Store
      </Button>
    </div>
  )
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
}
