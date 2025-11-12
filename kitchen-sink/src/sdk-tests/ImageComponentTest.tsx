import { useState } from "react";
import {
  useNavigateWithTransition,
  Image,
  Card,
  Button,
  Alert,
  AlertTitle,
  Touchable,
} from "@shopify/shop-minis-react";

// Mock image data with various sizes and states
const mockImages = [
  {
    id: "1",
    title: "Product Hero Image",
    url: "https://placehold.co/800x600/4F46E5/ffffff?text=Hero+Image",
    thumbnail: "https://placehold.co/200x150/4F46E5/ffffff?text=Thumb",
    width: 800,
    height: 600,
    alt: "Hero product image",
  },
  {
    id: "2",
    title: "Square Product Image",
    url: "https://placehold.co/600x600/10B981/ffffff?text=Square",
    thumbnail: "https://placehold.co/150x150/10B981/ffffff?text=Thumb",
    width: 600,
    height: 600,
    alt: "Square product image",
  },
  {
    id: "3",
    title: "Portrait Image",
    url: "https://placehold.co/400x600/DC2626/ffffff?text=Portrait",
    thumbnail: "https://placehold.co/100x150/DC2626/ffffff?text=Thumb",
    width: 400,
    height: 600,
    alt: "Portrait orientation",
  },
  {
    id: "4",
    title: "Landscape Image",
    url: "https://placehold.co/800x400/F59E0B/ffffff?text=Landscape",
    thumbnail: "https://placehold.co/200x100/F59E0B/ffffff?text=Thumb",
    width: 800,
    height: 400,
    alt: "Landscape orientation",
  },
  {
    id: "5",
    title: "Large Image (Simulated)",
    url: "https://placehold.co/2000x1500/8B5CF6/ffffff?text=Large+2000x1500",
    thumbnail: "https://placehold.co/200x150/8B5CF6/ffffff?text=Thumb",
    width: 2000,
    height: 1500,
    alt: "Large high resolution image",
  },
  {
    id: "6",
    title: "Invalid Image URL",
    url: "https://invalid-url-that-will-fail.com/image.jpg",
    thumbnail: "https://placehold.co/200x150/EF4444/ffffff?text=Error",
    width: 400,
    height: 300,
    alt: "This image will fail to load",
  },
];

export function ImageComponentTest() {
  const navigate = useNavigateWithTransition();
  const [loadingMode, setLoadingMode] = useState<"lazy" | "eager">("lazy");
  const [objectFit, setObjectFit] = useState<"cover" | "contain" | "fill">(
    "cover"
  );
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageQuality, setImageQuality] = useState<"low" | "medium" | "high">(
    "medium"
  );

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
            <h1 className="text-lg font-bold text-gray-900">Image Component</h1>
            <p className="text-xs text-gray-600">
              Optimized image loading with SDK
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Selected Image Alert */}
        {selectedImage && (
          <div className="px-4 pb-4">
            <Alert>
              <AlertTitle className="text-center">
                Selected: {selectedImage.title} ({selectedImage.width}x
                {selectedImage.height})
              </AlertTitle>
            </Alert>
          </div>
        )}

        {/* Controls */}
        <div className="p-4 bg-white border-b space-y-3">
          {/* Loading Mode */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Loading Mode:</span>
            <div className="flex gap-2">
              <Button
                onClick={() => setLoadingMode("lazy")}
                variant={loadingMode === "lazy" ? "default" : "secondary"}
                size="sm"
              >
                Lazy Load
              </Button>
              <Button
                onClick={() => setLoadingMode("eager")}
                variant={loadingMode === "eager" ? "default" : "secondary"}
                size="sm"
              >
                Eager Load
              </Button>
            </div>
          </div>

          {/* Object Fit */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Object Fit:</span>
            <div className="flex gap-2">
              <Button
                onClick={() => setObjectFit("cover")}
                variant={objectFit === "cover" ? "default" : "secondary"}
                size="sm"
              >
                Cover
              </Button>
              <Button
                onClick={() => setObjectFit("contain")}
                variant={objectFit === "contain" ? "default" : "secondary"}
                size="sm"
              >
                Contain
              </Button>
              <Button
                onClick={() => setObjectFit("fill")}
                variant={objectFit === "fill" ? "default" : "secondary"}
                size="sm"
              >
                Fill
              </Button>
            </div>
          </div>

          {/* Quality */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Image Quality:</span>
            <div className="flex gap-2">
              <Button
                onClick={() => setImageQuality("low")}
                variant={imageQuality === "low" ? "default" : "secondary"}
                size="sm"
              >
                Low
              </Button>
              <Button
                onClick={() => setImageQuality("medium")}
                variant={imageQuality === "medium" ? "default" : "secondary"}
                size="sm"
              >
                Medium
              </Button>
              <Button
                onClick={() => setImageQuality("high")}
                variant={imageQuality === "high" ? "default" : "secondary"}
                size="sm"
              >
                High
              </Button>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Image Gallery</h3>
          <div className="grid grid-cols-2 gap-3">
            {mockImages.map((image) => (
              <Card
                key={image.id}
                className="overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading={loadingMode}
                    aspectRatio={1}
                    className="w-full h-full"
                    objectFit={objectFit}
                    onLoad={() => console.log(`Loaded: ${image.title}`)}
                    onError={() => console.log(`Error loading: ${image.title}`)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-xs font-medium truncate">
                      {image.title}
                    </p>
                    <p className="text-white/80 text-xs">
                      {image.width}x{image.height}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Different Aspect Ratios */}
        <div className="p-4 space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">
              Aspect Ratio Examples
            </h3>
            <div className="space-y-3">
              {/* 16:9 */}
              <div>
                <p className="text-sm text-gray-600 mb-2">16:9 Aspect Ratio</p>
                <div className="aspect-video bg-gray-100 rounded overflow-hidden">
                  <Image
                    src="https://placehold.co/1920x1080/4F46E5/ffffff?text=16:9"
                    alt="16:9 aspect ratio"
                    width={1920}
                    height={1080}
                    loading={loadingMode}
                    className="w-full h-full"
                    style={{ objectFit }}
                  />
                </div>
              </div>

              {/* 1:1 */}
              <div>
                <p className="text-sm text-gray-600 mb-2">1:1 Aspect Ratio</p>
                <div className="aspect-square bg-gray-100 rounded overflow-hidden max-w-xs">
                  <Image
                    src="https://placehold.co/600x600/10B981/ffffff?text=1:1"
                    alt="1:1 aspect ratio"
                    width={600}
                    height={600}
                    loading={loadingMode}
                    className="w-full h-full"
                    style={{ objectFit }}
                  />
                </div>
              </div>

              {/* 4:3 */}
              <div>
                <p className="text-sm text-gray-600 mb-2">4:3 Aspect Ratio</p>
                <div className="aspect-4/3 bg-gray-100 rounded overflow-hidden max-w-xs">
                  <Image
                    src="https://placehold.co/800x600/F59E0B/ffffff?text=4:3"
                    alt="4:3 aspect ratio"
                    width={800}
                    height={600}
                    loading={loadingMode}
                    className="w-full h-full"
                    style={{ objectFit }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Features */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">
              Image Component Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Lazy loading for performance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Progressive image loading</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Placeholder/blur-up support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Responsive image sizing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Error handling & fallbacks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>WebP format support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Memory optimization</span>
              </li>
            </ul>
          </Card>

          {/* Usage Example */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900">Usage Example</h3>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
              {`import { Image } from '@shopify/shop-minis-react'

function ProductImage({ product }) {
  return (
    <Image
      src={product.imageUrl}
      alt={product.title}
      width={800}
      height={600}
      loading="lazy"
      placeholder={product.thumbnailUrl}
      className="w-full rounded-lg"
      style={{ objectFit: 'cover' }}
      quality={85}
      onLoad={() => console.log('Image loaded')}
      onError={(e) => console.error('Failed to load', e)}
    />
  )
}

// Image component features:
// - Automatic format selection (WebP when supported)
// - Responsive sizing with srcset
// - Built-in lazy loading
// - Progressive enhancement
// - Memory management`}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}
