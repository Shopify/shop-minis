import { useState } from "react";

// Import all the demo components
import { CurrentUser } from "./demos/CurrentUser";
import { SavedProductsActions } from "./demos/SavedProductsActions";
import { FollowedShopsActions } from "./demos/FollowedShopsActions";
import { Orders } from "./demos/Orders";
import { BuyerAttributes } from "./demos/BuyerAttributes";
import { RecommendedProducts } from "./demos/RecommendedProducts";
import { PopularProducts } from "./demos/PopularProducts";
import { AsyncStorage } from "./demos/AsyncStorage";
import { SecureStorage } from "./demos/SecureStorage";
import { ShopNavigation } from "./demos/ShopNavigation";
import { CloseMini } from "./demos/CloseMini";
import { RecommendedShops } from "./demos/RecommendedShops";
import { SavedProducts } from "./demos/SavedProducts";
import { RecentProducts } from "./demos/RecentProducts";
import { ProductSearch } from "./demos/ProductSearch";
import { Products } from "./demos/Products";
import { ProductList } from "./demos/ProductList";
import { ProductDetails } from "./demos/ProductDetails";
import { ProductVariants } from "./demos/ProductVariants";
import { ProductMedia } from "./demos/ProductMedia";
import { FollowedShops } from "./demos/FollowedShops";
import { RecentShops } from "./demos/RecentShops";
import { Shop } from "./demos/Shop";
import { ErrorToast } from "./demos/ErrorToast";
import { ErrorScreen } from "./demos/ErrorScreen";
import { Deeplink } from "./demos/Deeplink";
import { Share } from "./demos/Share";
import { ImagePicker } from "./demos/ImagePicker";

interface Hook {
  name: string;
  description: string;
  category: string;
  emoji: string;
}

interface HookDemoProps {
  hook: Hook;
  onBack: () => void;
}

// Minimalist category icons (single letters)
const categoryIcons: Record<string, string> = {
  User: "U",
  Product: "P",
  Storage: "S",
  Navigation: "N",
  Shop: "S",
  Utility: "U",
};

export function HookDemo({ hook, onBack }: HookDemoProps) {
  const [secureValue, setSecureValue] = useState("secret-data");

  const renderHookDemo = () => {
    switch (hook.name) {
      case "useCurrentUser":
        return <CurrentUser />;
      case "useSavedProductsActions":
        return <SavedProductsActions />;
      case "useFollowedShopsActions":
        return <FollowedShopsActions />;
      case "useOrders":
        return <Orders />;
      case "useBuyerAttributes":
        return <BuyerAttributes />;
      case "useRecommendedProducts":
        return <RecommendedProducts />;
      case "usePopularProducts":
        return <PopularProducts />;
      case "useSavedProducts":
        return <SavedProducts />;
      case "useRecentProducts":
        return <RecentProducts />;
      case "useProductSearch":
        return <ProductSearch />;
      case "useProducts":
        return <Products />;
      case "useProductList":
        return <ProductList />;
      case "useProductDetails":
        return <ProductDetails />;
      case "useProductVariants":
        return <ProductVariants />;
      case "useProductMedia":
        return <ProductMedia />;
      case "useAsyncStorage":
        return <AsyncStorage />;
      case "useSecureStorage":
        return (
          <SecureStorage
            secureValue={secureValue}
            setSecureValue={setSecureValue}
          />
        );
      case "useShopNavigation":
        return <ShopNavigation />;
      case "useCloseMini":
        return <CloseMini />;
      case "useDeeplink":
        return <Deeplink />;
      case "useRecommendedShops":
        return <RecommendedShops />;
      case "useFollowedShops":
        return <FollowedShops />;
      case "useRecentShops":
        return <RecentShops />;
      case "useShop":
        return <Shop />;
      case "useErrorToast":
        return <ErrorToast />;
      case "useErrorScreen":
        return <ErrorScreen />;
      case "useShare":
        return <Share />;
      case "useImagePicker":
        return <ImagePicker />;
      default:
        return <div>Demo not implemented yet</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Minimal Header */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="px-6 py-3">
          <button
            onClick={onBack}
            className="bg-transparent border-none py-1 px-0 text-sm text-gray-500 cursor-pointer flex items-center gap-1 font-medium tracking-tight"
          >
            ← Back to Hooks
          </button>
        </div>
      </div>

      {/* Hook Info Section - More Compact */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {/* Smaller Icon */}
          <div className="w-9 h-9 rounded-[10px] bg-gray-100 flex items-center justify-center shrink-0 text-sm font-semibold text-gray-500">
            {categoryIcons[hook.category]}
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-semibold text-black mb-1 tracking-tight">
              {hook.name}
            </h1>
            <p className="text-sm text-gray-500 m-0 leading-[1.4]">
              {hook.description}
            </p>
          </div>
        </div>
      </div>

      {/* Demo Content - Full Width */}
      <div className="p-6">{renderHookDemo()}</div>
    </div>
  );
}
