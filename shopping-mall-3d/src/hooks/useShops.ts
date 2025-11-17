import { useEffect, useState } from "react";

export const useShops = () => {
  const [shops, setShops] = useState<any[] | null>([]);

  useEffect(() => {
    const getShops = async () => {
      if (!window.minisSDK) {
        setShops([]);
        return;
      }

      const result = await window.minisSDK.getRecommendedShops({});

      if (result.ok && result.data.data) {
        setShops(result.data.data);
      } else {
        alert("getShops: Failed to get recommended shops");
        setShops(null);
      }
    };

    getShops();
  }, []);

  return { shops };
};
