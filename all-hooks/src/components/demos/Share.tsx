import { useState } from "react";
import { useShare, Button } from "@shopify/shop-minis-react";

export function Share() {
  const { share } = useShare();
  const [status, setStatus] = useState<string>("");

  const handleShare = async () => {
    try {
      setStatus("Sharing...");
      await share({
        title: "Check out this Shop Mini!",
        message: "I found this amazing Shop Mini that you might like.",
        url: "https://shop.app/example-mini",
      });
      setStatus("Shared successfully!");
    } catch {
      setStatus("Share cancelled or failed");
    }
  };

  const handleShareProduct = async () => {
    try {
      setStatus("Sharing product...");
      await share({
        title: "Amazing Product",
        message: "Check out this product I found!",
        url: "https://shop.app/products/example-product",
      });
      setStatus("Product shared successfully!");
    } catch {
      setStatus("Share cancelled or failed");
    }
  };

  const handleShareText = async () => {
    try {
      setStatus("Sharing text...");
      await share({
        message: "This is a text-only share from a Shop Mini! 🛍️",
      });
      setStatus("Text shared successfully!");
    } catch {
      setStatus("Share cancelled or failed");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Native Share API</h3>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-800">
            The share hook provides native sharing functionality. On supported
            platforms, it will open the native share sheet allowing users to
            share content to other apps.
          </p>
        </div>

        <Button onClick={handleShare} variant="default">
          Share Mini Link
        </Button>

        <Button onClick={handleShareProduct} variant="secondary">
          Share Product
        </Button>

        <Button onClick={handleShareText} variant="secondary">
          Share Text Only
        </Button>

        {status && (
          <div
            className={`p-3 rounded-lg text-sm ${
              status.includes("successfully")
                ? "bg-green-50 text-green-800"
                : status.includes("failed") || status.includes("cancelled")
                ? "bg-red-50 text-red-800"
                : "bg-gray-50 text-gray-800"
            }`}
          >
            {status}
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-semibold mb-2">Share Parameters:</p>
          <ul className="text-sm space-y-1">
            <li>
              <strong>title:</strong> The title of the shared content (optional)
            </li>
            <li>
              <strong>message:</strong> The message content to share (optional)
            </li>
            <li>
              <strong>url:</strong> The URL to share (optional)
            </li>
          </ul>
          <p className="text-xs text-gray-600 mt-2">
            At least one of these parameters must be provided.
          </p>
        </div>
      </div>
    </div>
  );
}
