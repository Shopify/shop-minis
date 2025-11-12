import { useState } from "react";
import { Button, useSecureStorage } from "@shopify/shop-minis-react";

// Fallback Textarea component since it's not exported from @shopify/shop-minis-react
const Textarea = ({ className = "", ...props }: any) => (
  <textarea
    className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
);

interface SecureStorageProps {
  secureValue: string;
  setSecureValue: (value: string) => void;
}

export function SecureStorage({
  secureValue,
  setSecureValue,
}: SecureStorageProps) {
  const storage = useSecureStorage();
  const [retrievedValue, setRetrievedValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStore = async () => {
    if ((storage as any).store) {
      setLoading(true);
      try {
        await (storage as any).store(secureValue);
        console.log("Stored securely");
      } catch (error) {
        console.error("Error storing secure data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRetrieve = async () => {
    if ((storage as any).retrieve) {
      setLoading(true);
      try {
        const value = await (storage as any).retrieve();
        setRetrievedValue(value);
      } catch (error) {
        console.error("Error retrieving secure data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemove = async () => {
    if ((storage as any).remove) {
      setLoading(true);
      try {
        await (storage as any).remove();
        setRetrievedValue(null);
        console.log("Removed securely");
      } catch (error) {
        console.error("Error removing secure data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Secure Storage</h3>
      <p className="text-sm text-gray-600">
        Note: You can only store one secret per Mini
      </p>
      <div className="space-y-2">
        <Textarea
          placeholder="Secure value to store"
          value={secureValue}
          onChange={(e: any) => setSecureValue(e.target.value)}
        />
        <div className="flex gap-2">
          <Button
            onClick={handleStore}
            disabled={loading || !(storage as any).store}
          >
            Store Securely
          </Button>
          <Button
            onClick={handleRetrieve}
            disabled={loading || !(storage as any).retrieve}
          >
            Retrieve
          </Button>
          <Button
            onClick={handleRemove}
            disabled={loading || !(storage as any).remove}
            variant="outline"
          >
            Remove
          </Button>
        </div>
      </div>
      {retrievedValue && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold">Retrieved Secure Value:</h4>
          <p className="text-sm mt-1">{retrievedValue}</p>
        </div>
      )}
      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Response
        </summary>
        <div className="p-4 pt-0">
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(storage, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
}
