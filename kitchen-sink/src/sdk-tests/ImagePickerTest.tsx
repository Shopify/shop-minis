import { useState } from "react";
import {
  useImagePicker,
  useNavigateWithTransition,
  Card,
  Button,
  Badge,
  Alert,
  Touchable,
  Image,
  AlertTitle,
} from "@shopify/shop-minis-react";

export function ImagePickerTest() {
  const navigate = useNavigateWithTransition();
  const imagePicker = useImagePicker();

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePickFromGallery = async () => {
    setError(null);
    setLoading(true);

    try {
      const file = await imagePicker.openGallery();
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImages((prev) => [...prev, imageUrl]);
      }
    } catch (err) {
      setError(`Gallery error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTakePhoto = async () => {
    setError(null);
    setLoading(true);

    try {
      // openCamera accepts optional camera facing: 'front' | 'back'
      const file = await imagePicker.openCamera({ cameraFacing: "back" });
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImages((prev) => [...prev, imageUrl]);
      }
    } catch (err) {
      setError(`Camera error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setSelectedImages([]);
    setError(null);
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
            <h1 className="text-lg font-bold text-gray-900">useImagePicker</h1>
            <p className="text-xs text-gray-600">
              Camera & photo library access
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Error Alert */}
        {error && <Alert variant="destructive">
          <AlertTitle className="text-center">
            {error}
          </AlertTitle>
        </Alert>}

        {/* Picker Options */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">Select Images</h3>

          <div className="space-y-3">
            <Button
              variant="default"
              onClick={handlePickFromGallery}
              disabled={loading}
              className="w-full"
            >
              <span className="flex items-center justify-center gap-2">
                <span>📸</span>
                <span>Choose from Gallery</span>
              </span>
            </Button>

            <Button
              variant="secondary"
              onClick={handleTakePhoto}
              disabled={loading}
              className="w-full"
            >
              <span className="flex items-center justify-center gap-2">
                <span>📷</span>
                <span>Take Photo</span>
              </span>
            </Button>

            <p className="text-xs text-gray-500 text-center">
              {loading
                ? "Processing..."
                : "Select images from gallery or take a photo"}
            </p>
          </div>
        </Card>

        {/* Selected Images */}
        {selectedImages.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Selected Images</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {selectedImages.length} selected
                </Badge>
                <Touchable
                  onClick={clearAll}
                  className="text-sm text-red-600 font-medium"
                >
                  Clear
                </Touchable>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {selectedImages.map((imageUri, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={imageUri}
                    alt={`Selected ${index + 1}`}
                    className="w-full rounded-lg"
                    aspectRatio="1"
                    objectFit="cover"
                  />
                  <Touchable
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                  >
                    ×
                  </Touchable>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* API Info */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">API Methods</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Badge>openGallery()</Badge>
              <p className="text-sm text-gray-600">Opens photo gallery</p>
            </div>
            <div className="flex items-start gap-2">
              <Badge>openCamera(facing?)</Badge>
              <p className="text-sm text-gray-600">'front' or 'back' camera</p>
            </div>
          </div>
        </Card>

        {/* Usage Example */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">Usage Example</h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { useImagePicker } from '@shopify/shop-minis-react'

function ImageSelector() {
  const imagePicker = useImagePicker()
  const [image, setImage] = useState(null)
  
  const selectFromGallery = async () => {
    try {
      const file = await imagePicker.openGallery()
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    } catch (error) {
      console.error('Gallery error:', error)
    }
  }
  
  const takePhoto = async () => {
    try {
      const file = await imagePicker.openCamera('back')
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    } catch (error) {
      console.error('Camera error:', error)
    }
  }
  
  return (
    <div>
      <Button onClick={selectFromGallery}>Gallery</Button>
      <Button onClick={takePhoto}>Camera</Button>
      {image && <Image src={image} />}
    </div>
  )
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
}
