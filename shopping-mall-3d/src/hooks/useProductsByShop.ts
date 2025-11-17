import { useEffect, useState } from "react";

export const useProductsByShop = (shopId: string) => {
  const [products, setProducts] = useState<any[] | null>([]);

  useEffect(() => {
    const getProducts = async () => {
      if (!window.minisSDK) {
        setProducts([]);
        return;
      }

      const result = await window.minisSDK.searchProductsByShop({
        shopId,
        query: "",
      });

      if (result.ok && result.data.data) {
        setProducts(result.data.data);
      } else {
        alert("getProducts: Failed to get products");
        setProducts(null);
      }
    };

    getProducts();
  }, [shopId]);

  return { products };
};
