import { useState } from "react";
import {
  Button,
  useNavigateWithTransition,
  Card,
  Alert,
  Touchable,
} from "@shopify/shop-minis-react";

export function ButtonVariantsTest() {
  const navigate = useNavigateWithTransition();
  const [lastPressed, setLastPressed] = useState<string | null>(null);

  const handlePress = (buttonType: string) => {
    setLastPressed(buttonType);
    setTimeout(() => setLastPressed(null), 2000);
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
              Button Components
            </h1>
            <p className="text-xs text-gray-600">
              SDK Button variants & states
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {/* Feedback Alert */}
        {lastPressed && <Alert>Pressed: {lastPressed}</Alert>}

        {/* Button Variants */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Variants</h3>
          <div className="space-y-3">
            <Button
              variant="default"
              onClick={() => handlePress("Default Button")}
              className="w-full"
            >
              Default Button
            </Button>

            <Button
              variant="secondary"
              onClick={() => handlePress("Secondary Button")}
              className="w-full"
            >
              Secondary Button
            </Button>

            <Button
              variant="tertiary"
              onClick={() => handlePress("Tertiary Button")}
              className="w-full"
            >
              Tertiary Button
            </Button>

            <Button
              variant="ghost"
              onClick={() => handlePress("Ghost Button")}
              className="w-full"
            >
              Ghost Button
            </Button>

            <Button
              variant="link"
              onClick={() => handlePress("Link Button")}
              className="w-full"
            >
              Link Button
            </Button>

            <Button
              variant="destructive"
              onClick={() => handlePress("Destructive Button")}
              className="w-full"
            >
              Destructive Button
            </Button>

            <Button
              variant="outline"
              onClick={() => handlePress("Outline Button")}
              className="w-full"
            >
              Outline Button
            </Button>
          </div>
        </Card>

        {/* Button Sizes */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Sizes</h3>
          <div className="space-y-3">
            <Button
              size="sm"
              onClick={() => handlePress("Small Button")}
              className="w-full"
            >
              Small Button
            </Button>

            <Button
              size="default"
              onClick={() => handlePress("Default Size Button")}
              className="w-full"
            >
              Default Size Button
            </Button>

            <Button
              size="lg"
              onClick={() => handlePress("Large Button")}
              className="w-full"
            >
              Large Button
            </Button>
          </div>
        </Card>

        {/* Button States */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">States</h3>
          <div className="space-y-3">
            <Button
              onClick={() => handlePress("Enabled Button")}
              className="w-full"
            >
              Enabled Button
            </Button>

            <Button
              disabled
              onClick={() => handlePress("This won't work")}
              className="w-full"
            >
              Disabled Button
            </Button>
          </div>
        </Card>

        {/* Icon Buttons */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">With Icons</h3>
          <div className="space-y-3">
            <Button
              variant="default"
              onClick={() => handlePress("Button with Left Icon")}
              className="w-full"
            >
              <span className="flex items-center justify-center gap-2">
                <span>🛍️</span>
                <span>Shop Now</span>
              </span>
            </Button>

            <Button
              variant="secondary"
              onClick={() => handlePress("Button with Right Icon")}
              className="w-full"
            >
              <span className="flex items-center justify-center gap-2">
                <span>Continue</span>
                <span>→</span>
              </span>
            </Button>

            <Button
              variant="icon"
              size="lg"
              onClick={() => handlePress("Icon Only Button")}
            >
              ❤️
            </Button>
          </div>
        </Card>

        {/* Usage Example */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Usage Example</h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { Button } from '@shopify/shop-minis-react'

function MyButtons() {
  return (
    <>
      <Button 
        variant="default"
        size="lg"
        onClick={() => console.log('Pressed!')}
      >
        Primary Action
      </Button>
      
      <Button
        variant="secondary"
        disabled={isDisabled}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      
      <Button
        variant="destructive"
        onClick={handleDelete}
      >
        Delete Item
      </Button>
    </>
  )
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
}
