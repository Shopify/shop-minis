import { MinisRouter } from "@shopify/shop-minis-react";
import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import { HomePage, SDKTestsPage, LibrariesPage } from "./pages";
import {
  CurrentUserTest,
  ProductSearchTest,
  PopularProductsTest,
  AsyncStorageTest,
  ImagePickerTest,
  SearchComponentTest,
  ButtonVariantsTest,
  ShopNavigationTest,
  ShopCartActionsTest,
  SecureStorageTest,
  GenerateUserTokenTest,
  ProductCardTest,
  MerchantCardTest,
  ListComponentTest,
  ImageComponentTest,
  VideoPlayerTest,
  CameraAccessTest,
  AlertBadgeTest,
  SkeletonTest,
  MicrophoneTest
} from "./sdk-tests";

// Lazy load heavy library components to prevent Android WebView crashes
const AnimationUILibraries = lazy(() => import("./libraries/AnimationUILibraries").then(m => ({ default: m.AnimationUILibraries })));
const StateUtilsLibraries = lazy(() => import("./libraries/StateUtilsLibraries").then(m => ({ default: m.StateUtilsLibraries })));
const CarouselLibraries = lazy(() => import("./libraries/CarouselLibraries").then(m => ({ default: m.CarouselLibraries })));
const DragDropLibraries = lazy(() => import("./libraries/DragDropLibraries").then(m => ({ default: m.DragDropLibraries })));
const EmojiLibraries = lazy(() => import("./libraries/EmojiLibraries").then(m => ({ default: m.EmojiLibraries })));
const ThreeDLibraries = lazy(() => import("./libraries/ThreeDLibraries").then(m => ({ default: m.ThreeDLibraries })));

// Loading component for Suspense fallback
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    </div>
  );
}

export function App() {
  return (
    <MinisRouter viewTransitions>
      <Routes>
        {/* Main Navigation Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/sdk-tests" element={<SDKTestsPage />} />
        <Route path="/libraries" element={<LibrariesPage />} />

        {/* SDK Test Routes */}
        <Route path="/sdk-tests/current-user" element={<CurrentUserTest />} />
        <Route
          path="/sdk-tests/product-search"
          element={<ProductSearchTest />}
        />
        <Route
          path="/sdk-tests/popular-products"
          element={<PopularProductsTest />}
        />
        <Route path="/sdk-tests/async-storage" element={<AsyncStorageTest />} />
        <Route path="/sdk-tests/image-picker" element={<ImagePickerTest />} />
        <Route path="/sdk-tests/search" element={<SearchComponentTest />} />
        <Route path="/sdk-tests/buttons" element={<ButtonVariantsTest />} />
        <Route
          path="/sdk-tests/shop-navigation"
          element={<ShopNavigationTest />}
        />
        <Route
          path="/sdk-tests/cart-actions"
          element={<ShopCartActionsTest />}
        />
        <Route
          path="/sdk-tests/secure-storage"
          element={<SecureStorageTest />}
        />
        <Route
          path="/sdk-tests/generate-token"
          element={<GenerateUserTokenTest />}
        />
        <Route path="/sdk-tests/product-card" element={<ProductCardTest />} />
        <Route path="/sdk-tests/merchant-card" element={<MerchantCardTest />} />
        <Route
          path="/sdk-tests/list-component"
          element={<ListComponentTest />}
        />
        <Route
          path="/sdk-tests/image-component"
          element={<ImageComponentTest />}
        />
        <Route path="/sdk-tests/video-player" element={<VideoPlayerTest />} />
        <Route path="/sdk-tests/camera-access" element={<CameraAccessTest />} />
        <Route path="/sdk-tests/microphone-access" element={<MicrophoneTest />} />
        <Route path="/sdk-tests/alert-badge" element={<AlertBadgeTest />} />
        <Route path="/sdk-tests/skeleton" element={<SkeletonTest />} />

        {/* Library Test Routes - Lazy Loaded */}
        <Route
          path="/libraries/animation-ui"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AnimationUILibraries />
            </Suspense>
          }
        />
        <Route
          path="/libraries/state-utils"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <StateUtilsLibraries />
            </Suspense>
          }
        />
        <Route
          path="/libraries/carousel"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <CarouselLibraries />
            </Suspense>
          }
        />
        <Route
          path="/libraries/drag-drop"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <DragDropLibraries />
            </Suspense>
          }
        />
        <Route
          path="/libraries/emoji"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <EmojiLibraries />
            </Suspense>
          }
        />
        <Route
          path="/libraries/3d"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ThreeDLibraries />
            </Suspense>
          }
        />
        <Route path="/libraries/*" element={<LibrariesPage />} />
      </Routes>
    </MinisRouter>
  );
}
