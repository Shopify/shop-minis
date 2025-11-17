import * as THREE from "three";
import { ProductImageFrame } from "./ProductImageFrame";
import { PriceTag } from "./PriceTag";

const CARD_HEIGHT = 0.7;
const CARD_DEPTH = 0.05;
const IMAGE_HEIGHT = 0.32;

interface ProductCardProps {
  product: {
    id: string;
    title?: string;
    price?: {
      amount: string;
      currencyCode: string;
    };
    featuredImage?: {
      url: string;
    };
  };
  position: [number, number, number];
  cardRef: React.RefObject<THREE.Group>;
}

export function ProductCard({ product, position, cardRef }: ProductCardProps) {
  return (
    <group
      ref={cardRef}
      onClick={() => {
        window.minisSDK.navigateToProduct({ productId: product.id });
      }}
      position={position}
    >
      {/* Product image */}
      {product.featuredImage && (
        <ProductImageFrame
          imageUrl={product.featuredImage.url}
          position={[
            0,
            CARD_HEIGHT / 2 - IMAGE_HEIGHT / 2 - 0.04,
            CARD_DEPTH / 2 + 0.001,
          ]}
        />
      )}
      {/* Product price */}
      {product.price && (
        <PriceTag
          price={`$${product.price.amount}0`}
          position={[0, 0.15, 0]}
          rotation={[0, -Math.PI, 0]}
        />
      )}
    </group>
  );
}

export { ProductImageFrame };
