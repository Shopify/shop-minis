import { MinisRouter } from "@shopify/shop-minis-react";
import { Routes, Route } from "react-router";
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
} from "./sdk-tests";
import {
  AnimationUILibraries,
  StateUtilsLibraries,
  CarouselLibraries,
  DragDropLibraries,
  EmojiLibraries,
  ThreeDLibraries,
} from "./libraries";

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
        <Route path="/sdk-tests/alert-badge" element={<AlertBadgeTest />} />
        <Route path="/sdk-tests/skeleton" element={<SkeletonTest />} />

        {/* Library Test Routes */}
        <Route
          path="/libraries/animation-ui"
          element={<AnimationUILibraries />}
        />
        <Route
          path="/libraries/state-utils"
          element={<StateUtilsLibraries />}
        />
        <Route path="/libraries/carousel" element={<CarouselLibraries />} />
        <Route path="/libraries/drag-drop" element={<DragDropLibraries />} />
        <Route path="/libraries/emoji" element={<EmojiLibraries />} />
        <Route path="/libraries/3d" element={<ThreeDLibraries />} />
        <Route path="/libraries/*" element={<LibrariesPage />} />
      </Routes>
    </MinisRouter>
  );
}
