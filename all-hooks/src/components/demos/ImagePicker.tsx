import { useState } from "react";
import { useImagePicker, Button } from "@shopify/shop-minis-react";

/* global window */

export function ImagePicker() {
  const { openCamera, openGallery } = useImagePicker();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleCameraCapture = async () => {
    try {
      setError(null);
      setStatus("Opening camera...");
      const file = await openCamera();
      const url = window.URL.createObjectURL(file);
      setSelectedImage(url);
      setStatus(
        `Captured image: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to capture image");
      setStatus("");
    }
  };

  const handleGallerySelect = async () => {
    try {
      setError(null);
      setStatus("Opening gallery...");
      const file = await openGallery();
      const url = window.URL.createObjectURL(file);
      setSelectedImage(url);
      setStatus(
        `Selected image: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to select image");
      setStatus("");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Image Picker</h3>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            The useImagePicker hook allows you to capture photos from the camera
            or select images from the gallery.
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCameraCapture} variant="default">
            📸 Open Camera
          </Button>

          <Button onClick={handleGallerySelect} variant="secondary">
            🖼️ Open Gallery
          </Button>
        </div>

        {status && (
          <div className="p-3 rounded-lg text-sm bg-gray-50 text-gray-800">
            {status}
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg text-sm bg-red-50 text-red-800">
            Error: {error}
          </div>
        )}

        {selectedImage && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Selected Image:</h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto max-h-[400px] object-contain"
              />
            </div>
            <Button
              onClick={() => {
                setSelectedImage(null);
                setStatus("");
              }}
              variant="outline"
            >
              Clear Image
            </Button>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-semibold mb-2">Hook Features:</p>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>openCamera():</strong> Opens device camera to capture a
              photo
            </li>
            <li>
              • <strong>openGallery():</strong> Opens photo gallery to select an
              image
            </li>
            <li>• Returns a File object that can be uploaded or displayed</li>
          </ul>
          <p className="text-xs text-gray-600 mt-2">
            Note: Camera access requires appropriate permissions on the device.
          </p>
        </div>
      </div>
    </div>
  );
}
