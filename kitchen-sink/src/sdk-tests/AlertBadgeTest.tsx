import { useState } from "react";
import {
  useNavigateWithTransition,
  Card,
  Alert,
  Badge,
  Button,
  Touchable,
} from "@shopify/shop-minis-react";

export function AlertBadgeTest() {
  const navigate = useNavigateWithTransition();
  const [showDismissible, setShowDismissible] = useState(false);
  const [showTimedAlert, setShowTimedAlert] = useState(false);
  const [alertCount, setAlertCount] = useState(0);

  const showTimedAlertHandler = () => {
    setShowTimedAlert(true);
    setTimeout(() => setShowTimedAlert(false), 3000);
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
            <h1 className="text-lg font-bold text-gray-900">Alert & Badge</h1>
            <p className="text-xs text-gray-600">
              Notification and status components
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {/* Alerts Section */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h2>

          <div className="space-y-3">
            {/* Default Alert */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Default Alert</p>
              <Alert>
                This is a default alert message with important information.
              </Alert>
            </div>

            {/* Destructive Alert */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Destructive Alert</p>
              <Alert variant="destructive">
                Error: Something went wrong. Please try again.
              </Alert>
            </div>

            {/* Custom Styled Alert */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Custom Styled Alert</p>
              <Alert className="bg-blue-50 border-blue-200 text-blue-900">
                <div className="flex items-start gap-2">
                  <span>ℹ️</span>
                  <div>
                    <p className="font-medium">Information</p>
                    <p className="text-sm mt-1">
                      This is a custom styled alert with an icon and multiple
                      lines.
                    </p>
                  </div>
                </div>
              </Alert>
            </div>

            {/* Dismissible Alert */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Dismissible Alert</p>
              {showDismissible ? (
                <Alert className="flex items-center justify-between">
                  <span>You can dismiss this alert</span>
                            <Touchable
                    onClick={() => setShowDismissible(false)}
                    className="text-sm font-medium underline"
                  >
                    Dismiss
                  </Touchable>
                </Alert>
              ) : (
                <Button
                  onClick={() => setShowDismissible(true)}
                  variant="secondary"
                  size="sm"
                >
                  Show Dismissible Alert
                </Button>
              )}
            </div>

            {/* Timed Alert */}
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Auto-dismiss Alert (3s)
              </p>
              {showTimedAlert && (
                <Alert className="bg-green-50 border-green-200 text-green-900">
                  ✅ Success! This alert will disappear in 3 seconds.
                </Alert>
              )}
              <Button
                onClick={showTimedAlertHandler}
                variant="secondary"
                size="sm"
                disabled={showTimedAlert}
              >
                Show Timed Alert
              </Button>
            </div>
          </div>
        </Card>

        {/* Badges Section */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Badges</h2>

          {/* Badge Variants */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Badge Variants</p>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Custom Gradient
              </Badge>
            </div>
          </div>

          {/* Badge with Numbers */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Notification Badges</p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button variant="secondary">Messages</Button>
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 px-2 py-0.5 text-xs"
                >
                  5
                </Badge>
              </div>

              <div className="relative">
                <Button variant="secondary">Notifications</Button>
                <Badge
                  variant="primary"
                  className="absolute -top-2 -right-2 px-2 py-0.5 text-xs"
                >
                  {alertCount || "0"}
                </Badge>
              </div>

              <Button
                onClick={() => setAlertCount(alertCount + 1)}
                variant="outline"
                size="sm"
              >
                Add Notification
              </Button>

              <Button
                onClick={() => setAlertCount(0)}
                variant="outline"
                size="sm"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Status Badges */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Status Badges</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Order Status:</span>
                <Badge variant="primary">Processing</Badge>
                <Badge variant="secondary">Shipped</Badge>
                <Badge
                  variant="primary"
                  className="bg-green-100 text-green-800"
                >
                  Delivered
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm">Product:</span>
                <Badge variant="destructive">Sale</Badge>
                <Badge variant="secondary">Out of Stock</Badge>
                <Badge variant="primary">New</Badge>
                <Badge variant="outline">Limited Edition</Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm">User:</span>
                <Badge variant="primary">Premium</Badge>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Gold Member
                </Badge>
                <Badge variant="secondary">Verified</Badge>
              </div>
            </div>
          </div>

          {/* Interactive Badge Example */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Interactive Badges</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                className="cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => alert("Badge clicked!")}
              >
                Clickable
              </Badge>
              <Badge
                variant="primary"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => alert("Filter by: Electronics")}
              >
                Electronics ✕
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => alert("Filter by: Clothing")}
              >
                Clothing ✕
              </Badge>
            </div>
          </div>
        </Card>

        {/* Combined Example */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Real-world Examples
          </h2>

          {/* Product Card with Badges */}
          <div className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-gray-900">
                  Premium Headphones
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  High-quality wireless audio
                </p>
              </div>
              <div className="flex gap-1">
                <Badge variant="destructive">-20%</Badge>
                <Badge variant="primary">Bestseller</Badge>
              </div>
            </div>
            <Alert className="mt-3 bg-yellow-50 border-yellow-200 text-yellow-900">
              <span className="text-sm">
                ⚡ Only 3 left in stock - order soon!
              </span>
            </Alert>
          </div>

          {/* Notification List */}
          <div className="space-y-2">
            <Alert>
              <div className="flex items-center justify-between">
                <span>Your order has been shipped</span>
                <Badge variant="primary">New</Badge>
              </div>
            </Alert>

            <Alert className="bg-green-50 border-green-200 text-green-900">
              <div className="flex items-center justify-between">
                <span>Payment successful</span>
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              </div>
            </Alert>

            <Alert variant="destructive">
              <div className="flex items-center justify-between">
                <span>Item is out of stock</span>
                <Badge variant="destructive">Alert</Badge>
              </div>
            </Alert>
          </div>
        </Card>

        {/* Usage Example */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Usage Example</h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { Alert, Badge } from '@shopify/shop-minis-react'

function Notifications() {
  return (
    <>
      {/* Alerts */}
      <Alert>Default notification</Alert>
      
      <Alert variant="destructive">
        Error message
      </Alert>
      
      <Alert className="custom-styles">
        Custom alert with icon
      </Alert>
      
      {/* Badges */}
      <Badge>Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="destructive">Sale</Badge>
      
      {/* With numbers */}
      <Badge variant="primary">5</Badge>
      
      {/* Status indicators */}
      <div className="flex gap-2">
        <Badge variant="secondary">Shipped</Badge>
        <Badge variant="primary">New</Badge>
      </div>
    </>
  )
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
}
