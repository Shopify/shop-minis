import { useState } from "react";
import {
  useNavigateWithTransition,
  Card,
  Alert,
  Badge,
  Input,
  Skeleton,
  Separator,
  Label,
  Touchable,
} from "@shopify/shop-minis-react";

export function UIComponentsTest() {
  const navigate = useNavigateWithTransition();
  const [inputValue, setInputValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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
            <h1 className="text-lg font-bold text-gray-900">UI Components</h1>
            <p className="text-xs text-gray-600">Core SDK UI components</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {/* Cards */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900 px-2">Cards</h2>

          <Card>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Basic Card</h3>
              <p className="text-sm text-gray-600">
                This is a basic card component with padding.
              </p>
            </div>
          </Card>

          <Card className="p-4 border-blue-200 bg-blue-50">
            <h3 className="font-semibold text-blue-900 mb-2">Styled Card</h3>
            <p className="text-sm text-blue-700">
              Cards can be customized with className prop.
            </p>
          </Card>
        </div>

        <Separator />

        {/* Alerts */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900 px-2">Alerts</h2>

          <Alert>Default alert message</Alert>

          <Alert variant="destructive">
            Error alert with destructive variant
          </Alert>

          {showAlert && (
            <Alert className="flex items-center justify-between">
              <span>Dismissible alert</span>
                        <Touchable
                onClick={() => setShowAlert(false)}
                className="text-sm font-medium"
              >
                Dismiss
              </Touchable>
            </Alert>
          )}

          {!showAlert && (
                      <Touchable
              onClick={() => setShowAlert(true)}
              className="px-3 py-2 bg-gray-100 rounded-md text-sm"
            >
              Show Dismissible Alert
            </Touchable>
          )}
        </div>

        <Separator />

        {/* Badges */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900 px-2">Badges</h2>

          <div className="flex flex-wrap gap-2 p-2">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="none" className="bg-green-100 text-green-800">
              Custom
            </Badge>
          </div>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Product Status:</span>
              <Badge variant="primary">In Stock</Badge>
              <Badge variant="destructive">Sale</Badge>
              <Badge variant="secondary">New</Badge>
            </div>
          </Card>
        </div>

        <Separator />

        {/* Inputs */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900 px-2">Inputs</h2>

          <Card className="p-4 space-y-3">
            <div>
              <Label htmlFor="basic-input">Basic Input</Label>
              <Input
                id="basic-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter text..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="disabled-input">Disabled Input</Label>
              <Input
                id="disabled-input"
                value="Disabled"
                disabled
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password-input">Password Input</Label>
              <Input
                id="password-input"
                type="password"
                placeholder="Enter password..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="number-input">Number Input</Label>
              <Input
                id="number-input"
                type="number"
                placeholder="Enter number..."
                className="mt-1"
              />
            </div>
          </Card>
        </div>

        <Separator />

        {/* Skeleton */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900 px-2">Skeleton</h2>

          <Card className="p-4 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />

            <div className="flex items-center gap-3 pt-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <div className="pt-3">
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </Card>
        </div>

        <Separator />

        {/* Labels */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900 px-2">Labels</h2>

          <Card className="p-4 space-y-3">
            <div className="space-y-1">
              <Label>Default Label</Label>
              <p className="text-sm text-gray-600">Labels for form fields</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="labeled-field">
                Label with htmlFor
                <Input
                  id="labeled-field"
                  placeholder="Connected input..."
                  className="mt-1"
                />
              </Label>
            </div>
          </Card>
        </div>

        <Separator />

        {/* Usage Example */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Usage Example</h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { 
  Card, Alert, Badge, Input, 
  Skeleton, Separator, Label 
} from '@shopify/shop-minis-react'

function MyUI() {
  return (
    <Card className="p-4">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Enter name..." />
      
      <Separator className="my-4" />
      
      <Alert>Welcome back!</Alert>
      
      <div className="flex gap-2 mt-2">
        <Badge variant="primary">Active</Badge>
        <Badge variant="secondary">Member</Badge>
      </div>
      
      {loading && <Skeleton className="h-20 w-full" />}
    </Card>
  )
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
}
