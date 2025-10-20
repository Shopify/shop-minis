import { useState, useEffect } from "react";
import {
  useSecureStorage,
  useNavigateWithTransition,
  Card,
  Button,
  Input,
  Alert,
  Badge,
  Touchable,
  Label,
} from "@shopify/shop-minis-react";

export function SecureStorageTest() {
  const navigate = useNavigateWithTransition();
  const { getSecret, setSecret, removeSecret } = useSecureStorage();

  const [secretValue, setSecretValue] = useState("");
  const [storedSecret, setStoredSecret] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Load secret on mount
  useEffect(() => {
    loadSecret();
  }, []);

  const loadSecret = async () => {
    setLoading(true);
    try {
      const secret = await getSecret();
      setStoredSecret(secret);
      if (secret) {
        setMessage({ type: "success", text: "Secret loaded successfully" });
      } else {
        setMessage({ type: "error", text: "No secret stored" });
      }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: `Failed to load secret: ${error.message}`,
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleSecretSave = async () => {
    if (!secretValue) {
      setMessage({ type: "error", text: "Please enter a secret value" });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setLoading(true);
    try {
      await setSecret({ value: secretValue });
      setMessage({ type: "success", text: "Secret saved securely" });
      await loadSecret();
      setSecretValue("");
    } catch (error: any) {
      setMessage({ type: "error", text: `Failed to save: ${error.message}` });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleSecretRemove = async () => {
    setLoading(true);
    try {
      await removeSecret();
      setMessage({ type: "success", text: "Secret removed" });
      setStoredSecret(null);
    } catch (error: any) {
      setMessage({ type: "error", text: `Failed to remove: ${error.message}` });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
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
            <h1 className="text-lg font-bold text-gray-900">
              useSecureStorage
            </h1>
            <p className="text-xs text-gray-600">
              Secure encrypted storage for sensitive data
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Message Alert */}
        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"}>
            {message.text}
          </Alert>
        )}

        {/* Current Secret Display */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Current Secret</h3>
          <div className="space-y-3">
            {storedSecret ? (
              <div className="p-3 bg-gray-100 rounded font-mono text-sm break-all">
                {storedSecret.substring(0, 20)}...
                <Badge className="ml-2" variant="primary">
                  Encrypted
                </Badge>
              </div>
            ) : (
              <p className="text-gray-500 italic">No secret stored</p>
            )}

            <div className="flex gap-2">
              <Button
                onClick={loadSecret}
                variant="secondary"
                size="sm"
                disabled={loading}
              >
                Refresh
              </Button>
              {storedSecret && (
                <Button
                  onClick={handleSecretRemove}
                  variant="destructive"
                  size="sm"
                  disabled={loading}
                >
                  Remove Secret
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Save New Secret */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Save New Secret</h3>
          <div className="space-y-3">
            <div>
              <Label>
                Secret Value
              </Label>
              <Input
                value={secretValue}
                onChange={(e) => setSecretValue(e.target.value)}
                placeholder="Enter sensitive data..."
                type="password"
              />
            </div>

            <Button
              onClick={handleSecretSave}
              disabled={loading || !secretValue}
              className="w-full"
            >
              {loading ? "Saving..." : "Save Secret"}
            </Button>
          </div>
        </Card>

        {/* Info Section */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            About Secure Storage
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-900">Features:</h4>
              <ul className="ml-4 mt-2 space-y-1 list-disc">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure key management</li>
                <li>Platform-level security</li>
                <li>Automatic encryption/decryption</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">Use Cases:</h4>
              <ul className="ml-4 mt-2 space-y-1 list-disc">
                <li>Authentication tokens</li>
                <li>API keys</li>
                <li>User credentials</li>
                <li>Payment information</li>
                <li>Personal identifiable information (PII)</li>
              </ul>
            </div>

            <Alert>
              <strong>Note:</strong> SecureStorage stores a single encrypted
              secret. For multiple key-value pairs, use JSON encoding or
              consider using AsyncStorage for non-sensitive data.
            </Alert>
          </div>
        </Card>

        {/* Example Usage */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Example Usage</h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { useSecureStorage } from '@shopify/shop-minis-react'

function MyComponent() {
  const { getSecret, setSecret, removeSecret } = useSecureStorage()
  
  // Save a secret
  await setSecret({ value: 'my-secret-token' })
  
  // Retrieve the secret
  const secret = await getSecret()
  
  // Remove the secret
  await removeSecret()
}`}
          </pre>
        </Card>

        {/* Security Best Practices */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            Security Best Practices
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Never log or display sensitive data in production</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Use secure storage for tokens, not regular data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Clear sensitive data when no longer needed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Implement proper error handling</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Use HTTPS for all network communications</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
