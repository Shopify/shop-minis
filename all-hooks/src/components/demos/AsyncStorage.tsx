/* eslint-disable no-undef */
import { useState } from "react";
import { Button, Input, useAsyncStorage } from "@shopify/shop-minis-react";

export function AsyncStorage() {
  const [storageKey, setStorageKey] = useState("demo-key");
  const [storageValue, setStorageValue] = useState("demo-value");
  const { getItem, setItem, removeItem, getAllKeys, clear } = useAsyncStorage();
  const [retrievedValue, setRetrievedValue] = useState<string | null>(null);
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStore = async () => {
    setLoading(true);
    setError(null);
    try {
      await setItem({ key: storageKey, value: storageValue });
      console.log("Stored successfully");
    } catch (error) {
      console.error("Error storing data:", error);
      setError(error instanceof Error ? error.message : "Failed to store data");
    } finally {
      setLoading(false);
    }
  };

  const handleRetrieve = async () => {
    setLoading(true);
    setError(null);
    try {
      const value = await getItem({ key: storageKey });
      setRetrievedValue(value);
    } catch (error) {
      console.error("Error retrieving data:", error);
      setError(
        error instanceof Error ? error.message : "Failed to retrieve data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    setError(null);
    try {
      await removeItem({ key: storageKey });
      setRetrievedValue(null);
      console.log("Removed successfully");
    } catch (error) {
      console.error("Error removing data:", error);
      setError(
        error instanceof Error ? error.message : "Failed to remove data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllKeys = async () => {
    setLoading(true);
    setError(null);
    try {
      const keys = await getAllKeys();
      setAllKeys(keys);
    } catch (error) {
      console.error("Error getting all keys:", error);
      setError(
        error instanceof Error ? error.message : "Failed to get all keys"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setLoading(true);
    setError(null);
    try {
      await clear();
      setRetrievedValue(null);
      setAllKeys([]);
      console.log("Cleared all storage");
    } catch (error) {
      console.error("Error clearing storage:", error);
      setError(
        error instanceof Error ? error.message : "Failed to clear storage"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Async Storage</h3>
      <div className="space-y-2">
        <input type="text" placeholder="Storage key" />
        <Input
          placeholder="Storage key"
          value={storageKey}
          onChange={(e) => setStorageKey(e.target.value)}
        />
        <Input
          placeholder="Value to store"
          value={storageValue}
          onChange={(e) => setStorageValue(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleStore}
            disabled={loading || !storageKey || !storageValue}
          >
            Store
          </Button>
          <Button onClick={handleRetrieve} disabled={loading || !storageKey}>
            Retrieve
          </Button>
          <Button
            onClick={handleRemove}
            disabled={loading || !storageKey}
            variant="outline"
          >
            Remove
          </Button>
          <Button
            onClick={handleGetAllKeys}
            disabled={loading}
            variant="outline"
          >
            Get All Keys
          </Button>
          <Button onClick={handleClear} disabled={loading} variant="outline">
            Clear All
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {retrievedValue !== null && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold">Retrieved Value:</h4>
          <p className="text-sm mt-1">{retrievedValue}</p>
        </div>
      )}

      {allKeys.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold">All Storage Keys:</h4>
          <ul className="text-sm mt-1 list-disc list-inside">
            {allKeys.map((key, index) => (
              <li key={index}>{key}</li>
            ))}
          </ul>
        </div>
      )}

      <details className="bg-gray-50 border border-gray-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold text-gray-700 hover:bg-gray-100">
          🔧 Hook API Response
        </summary>
        <div className="p-4 pt-0">
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(
              { getItem, setItem, removeItem, getAllKeys, clear },
              null,
              2
            )}
          </pre>
        </div>
      </details>
    </div>
  );
}
