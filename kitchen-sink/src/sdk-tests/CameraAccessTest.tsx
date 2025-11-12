import { useState, useRef } from "react";
import {
  useNavigateWithTransition,
  useImagePicker,
  Card,
  Button,
  Badge,
  Alert,
  AlertTitle,
  Touchable,
  Image,
} from "@shopify/shop-minis-react";

export function CameraAccessTest() {
  const navigate = useNavigateWithTransition();
  const imagePicker = useImagePicker();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("back");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [flashMode, setFlashMode] = useState<"off" | "on" | "auto">("off");

  // Open native camera using SDK
  const handleOpenCamera = async () => {
    try {
      const result = await imagePicker.openCamera(cameraFacing);
      if (result) {
        const imageUrl = URL.createObjectURL(result);
        setCapturedImages((prev) => [imageUrl, ...prev]);
      }
    } catch (error: any) {
      console.error("Camera error:", error);
      setStreamError(error.message || "Failed to access camera");
    }
  };

  // Start camera stream (Web API fallback for demo)
  const startCameraStream = async () => {
    try {
      setStreamError(null);
      const constraints = {
        video: {
          facingMode: cameraFacing === "front" ? "user" : "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error: any) {
      console.error("Stream error:", error);
      setStreamError(error.message || "Failed to access camera stream");
      setIsStreaming(false);
    }
  };

  // Stop camera stream
  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  // Capture photo from stream
  const captureFromStream = () => {
    if (videoRef.current && canvasRef.current && isStreaming) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const imageUrl = canvas.toDataURL("image/jpeg", 0.9);
        setCapturedImages((prev) => [imageUrl, ...prev]);

        // Flash effect
        if (flashMode === "on" || flashMode === "auto") {
          const flash = document.createElement("div");
          flash.className =
            "fixed inset-0 bg-white z-50 pointer-events-none animate-flash";
          document.body.appendChild(flash);
          setTimeout(() => flash.remove(), 200);
        }
      }
    }
  };

  // Clear all captured images
  const clearImages = () => {
    setCapturedImages([]);
    setSelectedImage(null);
  };

  // Delete specific image
  const deleteImage = (index: number) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
    if (selectedImage === capturedImages[index]) {
      setSelectedImage(null);
    }
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
            <h1 className="text-lg font-bold text-gray-900">Camera Access</h1>
            <p className="text-xs text-gray-600">Native camera functionality</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Error Alert */}
        {streamError && (
          <div className="p-4">
            <Alert variant="destructive">
              <AlertTitle className="text-center">Camera Error: {streamError}</AlertTitle>
              </Alert>
          </div>
        )}

        {/* Selected Image Display */}
        {selectedImage && (
          <div className="p-4">
            <Card className="p-2">
              <Image
                src={selectedImage}
                alt="Selected capture"
                className="w-full rounded"
                aspectRatio="auto"
                objectFit="contain"
              />
              <Button
                onClick={() => setSelectedImage(null)}
                variant="secondary"
                className="w-full mt-2"
              >
                Close Preview
              </Button>
            </Card>
          </div>
        )}

        {/* Camera Preview */}
        <div className="bg-black">
          <div className="aspect-[4/3] relative">
            {isStreaming ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Camera Controls Overlay */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
                  <Touchable
                    onClick={captureFromStream}
                    className="w-16 h-16 bg-white rounded-full border-4 border-gray-300 active:scale-95"
                  >
                    <span className="text-2xl">📸</span>
                  </Touchable>
                </div>

                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    onClick={() =>
                      setCameraFacing(
                        cameraFacing === "front" ? "back" : "front"
                      )
                    }
                    variant="secondary"
                    size="sm"
                  >
                    🔄 Flip
                  </Button>
                  <Button
                    onClick={stopCameraStream}
                    variant="destructive"
                    size="sm"
                  >
                    ✕ Stop
                  </Button>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <div className="text-center">
                  <span className="text-6xl text-gray-600">📷</span>
                  <p className="text-gray-400 mt-2">Camera Preview</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Camera Controls */}
        <div className="p-4 bg-white border-b space-y-3">
          <h3 className="font-semibold text-gray-900">Camera Options</h3>

          {/* Native Camera Access */}
          <div className="flex gap-2">
            <Button
              onClick={handleOpenCamera}
              variant="default"
              className="flex-1"
            >
              📷 Open Native Camera
            </Button>
            <Button
              onClick={() =>
                setCameraFacing(cameraFacing === "front" ? "back" : "front")
              }
              variant="secondary"
            >
              {cameraFacing === "front" ? "Back Camera" : "Front Camera"}
            </Button>
          </div>

          {/* Web Camera Stream */}
          <div className="flex gap-2">
            {!isStreaming ? (
              <Button
                onClick={startCameraStream}
                variant="secondary"
                className="flex-1"
              >
                📹 Start Camera Stream
              </Button>
            ) : (
              <Button
                onClick={stopCameraStream}
                variant="destructive"
                className="flex-1"
              >
                Stop Stream
              </Button>
            )}
          </div>

          {/* Flash Mode */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Flash Mode:</span>
            <div className="flex gap-2">
              <Button
                onClick={() => setFlashMode("off")}
                variant={flashMode === "off" ? "default" : "outline"}
                size="sm"
              >
                Off
              </Button>
              <Button
                onClick={() => setFlashMode("on")}
                variant={flashMode === "on" ? "default" : "outline"}
                size="sm"
              >
                On
              </Button>
              <Button
                onClick={() => setFlashMode("auto")}
                variant={flashMode === "auto" ? "default" : "outline"}
                size="sm"
              >
                Auto
              </Button>
            </div>
          </div>
        </div>

        {/* Captured Images Gallery */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              Captured Images
              {capturedImages.length > 0 && (
                <Badge variant="primary" className="ml-2">
                  {capturedImages.length}
                </Badge>
              )}
            </h3>
            {capturedImages.length > 0 && (
              <Button onClick={clearImages} variant="destructive" size="sm">
                Clear All
              </Button>
            )}
          </div>

          {capturedImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {capturedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={image}
                    alt={`Capture ${index + 1}`}
                    className="w-full rounded cursor-pointer"
                    aspectRatio="1"
                    objectFit="cover"
                    onClick={() => setSelectedImage(image)}
                  />
                  <Touchable
                    onClick={() => deleteImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs opacity-0 group-active:opacity-100 transition-opacity"
                  >
                    ✕
                  </Touchable>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl">📸</span>
              <p className="mt-2">No images captured yet</p>
            </div>
          )}
        </div>

        {/* Features & Info */}
        <div className="p-4 space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">
              Camera Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Native camera integration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Front and back camera support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Photo capture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Live camera preview</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Flash control</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Image gallery management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Permission handling</span>
              </li>
            </ul>
          </Card>

          <Alert className="bg-yellow-50 border-yellow-200 w-90">
            <div className="w-80 flex gap-2">
              <span className="text-yellow-600">⚠️</span>
              <div>
                <p className="font-medium text-yellow-900">
                  Permission Required
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Camera access requires user permission. The app will
                  automatically request permission when you first try to use the
                  camera.
                </p>
              </div>
            </div>
          </Alert>

          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">Usage Example</h3>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
              {`import { useImagePicker } from '@shopify/shop-minis-react'

function CameraCapture() {
  const imagePicker = useImagePicker()
  const [photo, setPhoto] = useState(null)

  const takePhoto = async () => {
    try {
      // Open camera (back camera by default)
      const result = await imagePicker.openCamera('back')
      
      if (result) {
        // Result is a File object
        const imageUrl = URL.createObjectURL(result)
        setPhoto(imageUrl)
      }
    } catch (error) {
      console.error('Camera error:', error)
    }
  }

  const selectFromGallery = async () => {
    try {
      const result = await imagePicker.openGallery()
      if (result) {
        const imageUrl = URL.createObjectURL(result)
        setPhoto(imageUrl)
      }
    } catch (error) {
      console.error('Gallery error:', error)
    }
  }

  return (
    <>
      <Button onClick={takePhoto}>Take Photo</Button>
      <Button onClick={selectFromGallery}>Choose from Gallery</Button>
      {photo && <Image src={photo} alt="Captured" />}
    </>
  )
}`}
            </pre>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes flash {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .animate-flash {
          animation: flash 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
