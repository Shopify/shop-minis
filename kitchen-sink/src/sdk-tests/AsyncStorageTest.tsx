import { useState, useEffect } from "react";
import {
  useAsyncStorage,
  useNavigateWithTransition,
  Card,
  Input,
  Button,
  Badge,
  Alert,
  Touchable,
  Label,
  AlertTitle,
} from "@shopify/shop-minis-react";

export function AsyncStorageTest() {
  const navigate = useNavigateWithTransition();
  const storage = useAsyncStorage();

  const [key, setKey] = useState("test-key");
  const [value, setValue] = useState("");
  const [storedData, setStoredData] = useState<Record<string, any>>({});
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Load all stored data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const keys = await storage.getAllKeys();
      const data: Record<string, any> = {};

      for (const k of keys) {
        const val = await storage.getItem({ key: k });
        if (val) data[k] = val;
      }

      setStoredData(data);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load stored data" });
    }
  };

  const handleSave = async () => {
    if (!key || !value) {
      setMessage({ type: "error", text: "Please enter both key and value" });
      return;
    }

    try {
      await storage.setItem({ key, value });
      setMessage({ type: "success", text: `Saved "${key}" successfully!` });
      await loadAllData();
      setValue("");
    } catch (error) {
      setMessage({ type: "error", text: `Failed to save: ${error}` });
    }
  };

  const handleGet = async () => {
    if (!key) {
      setMessage({ type: "error", text: "Please enter a key" });
      return;
    }

    try {
      const result = await storage.getItem({ key });
      if (result) {
        setValue(result);
        setMessage({ type: "success", text: `Retrieved "${key}"` });
      } else {
        setMessage({ type: "error", text: `No value found for "${key}"` });
      }
    } catch (error) {
      setMessage({ type: "error", text: `Failed to get: ${error}` });
    }
  };

  const handleDelete = async (keyToDelete: string) => {
    try {
      await storage.removeItem({ key: keyToDelete });
      setMessage({ type: "success", text: `Deleted "${keyToDelete}"` });
      await loadAllData();
    } catch (error) {
      setMessage({ type: "error", text: `Failed to delete: ${error}` });
    }
  };

  const handleClearAll = async () => {
    try {
      await storage.clear();
      setMessage({ type: "success", text: "Cleared all storage" });
      await loadAllData();
    } catch (error) {
      setMessage({ type: "error", text: `Failed to clear: ${error}` });
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
            <h1 className="text-lg font-bold text-gray-900">useAsyncStorage</h1>
            <p className="text-xs text-gray-600">
              Persistent key-value storage
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Alert Message */}
        {message && (
          <Alert
            variant={message.type === "success" ? "default" : "destructive"}
          >
            <AlertTitle className="text-center">
              {message.text}
            </AlertTitle>
          </Alert>
        )}

        {/* Storage Operations */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">
            Storage Operations
          </h3>

          <div className="space-y-3">
            <div>
              <Label>Key</Label>
              <Input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter storage key..."
                className="mt-1"
              />
            </div>

            <div>
              <Label>Value</Label>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value to store..."
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} variant="default" className="flex-1">
                Save
              </Button>
              <Button
                onClick={handleGet}
                variant="secondary"
                className="flex-1"
              >
                Get
              </Button>
            </div>
          </div>
        </Card>

        {/* Stored Data */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Stored Data</h3>
            <Badge variant="secondary">
              {Object.keys(storedData).length} items
            </Badge>
          </div>

          {Object.keys(storedData).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(storedData).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{k}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {String(v)}
                    </p>
                  </div>
                  <Touchable
                    onClick={() => handleDelete(k)}
                    className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    style={{ minHeight: "48px", minWidth: "48px" }}
                  >
                    🗑️
                  </Touchable>
                </div>
              ))}

              <Button
                onClick={handleClearAll}
                variant="destructive"
                className="w-full mt-3"
              >
                Clear All Storage
              </Button>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No data stored yet. Try saving something!
            </p>
          )}
        </Card>

        {/* Usage Example */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900">Usage Example</h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { useAsyncStorage } from '@shopify/shop-minis-react'

function MyComponent() {
  const storage = useAsyncStorage()
  
  // Save data
  await storage.setItem({
    key: 'user-prefs',
    value: JSON.stringify({
      theme: 'dark',
      notifications: true
    })
  })
  
  // Get data
  const prefs = await storage.getItem({ key: 'user-prefs' })
  const parsed = JSON.parse(prefs || '{}')
  
  // Remove item
  await storage.removeItem({ key: 'user-prefs' })
  
  // Get all keys
  const keys = await storage.getAllKeys()
  
  // Clear all
  await storage.clear()
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
}
