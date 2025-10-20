import { useState } from "react";
import {
  useGenerateUserToken,
  useNavigateWithTransition,
  Card,
  Button,
  Badge,
  Alert,
  Input,
  Touchable,
  Label,
} from "@shopify/shop-minis-react";

export function GenerateUserTokenTest() {
  const navigate = useNavigateWithTransition();
  const { generateUserToken } = useGenerateUserToken();

  const [token, setToken] = useState<string | null>(null);
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [customScopes, setCustomScopes] = useState("");

  const handleGenerateToken = async () => {
    setToken(null);
    setTokenInfo(null);
    setExpiresAt(null);
    setError(null);

    try {
      const result = await generateUserToken();

      if (result?.data?.token) {
        setToken(result.data.token);
        setExpiresAt(
          result.data.expiresAt || new Date(Date.now() + 3600000).toISOString()
        );

        // Decode token payload (for demo purposes)
        try {
          const parts = result.data.token.split(".");
          if (parts.length > 1) {
            const payload = JSON.parse(atob(parts[1]));
            setTokenInfo(payload);
          }
        } catch (e) {
          console.error("Failed to decode token", e);
        }
      } else {
        setError(
          result?.userErrors?.[0]?.message || "Failed to generate token"
        );
      }
    } catch (err: any) {
      console.error("Token generation failed:", err);
      setError(err?.message || "An error occurred while generating token");
    }
  };

  const handleCustomScopes = () => {
    const scopeArray = customScopes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (scopeArray.length > 0) {
      handleGenerateToken();
    }
  };

  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      alert("Token copied to clipboard!");
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
              useGenerateUserToken
            </h1>
            <p className="text-xs text-gray-600">
              Generate auth tokens for backend API calls
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {/* Token Generation Info */}
        <Alert className="bg-blue-50 border-blue-200">
          <div className="flex items-start gap-2">
            <span className="text-blue-600">🔑</span>
            <div>
              <p className="font-medium text-blue-900">Authentication Tokens</p>
              <p className="text-sm text-blue-700 mt-1">
                Generate secure JWT tokens to authenticate backend API calls on
                behalf of the current Shop user.
              </p>
            </div>
          </div>
        </Alert>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            {error || "Failed to generate token"}
          </Alert>
        )}

        {/* Token Generation */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Generate Token</h3>

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Choose a scope for the token:
            </p>

            {/* Predefined Scopes */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => handleGenerateToken()}
                variant="secondary"
                size="sm"
              >
                Read Profile
              </Button>
              <Button
                onClick={() => handleGenerateToken()}
                variant="secondary"
                size="sm"
              >
                Read Orders
              </Button>
              <Button
                onClick={() => handleGenerateToken()}
                variant="secondary"
                size="sm"
              >
                Write Cart
              </Button>
              <Button
                onClick={() => handleGenerateToken()}
                variant="secondary"
                size="sm"
              >
                Read Products
              </Button>
            </div>

            {/* Custom Scopes */}
            <div className="space-y-2">
              <Label>Custom Scopes:</Label>
              <div className="flex gap-2">
                <Input
                  value={customScopes}
                  onChange={(e) => setCustomScopes(e.target.value)}
                  placeholder="scope1, scope2, scope3"
                  className="flex-1"
                />
                <Button
                  onClick={handleCustomScopes}
                  variant="default"
                  disabled={!customScopes}
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Generated Token */}
        {token && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Generated Token</h3>
              <Badge variant="primary">Active</Badge>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-gray-900 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">JWT Token:</p>
                <p className="text-xs text-green-400 font-mono break-all">
                  {token.substring(0, 50)}...
                  {token.substring(token.length - 20)}
                </p>
              </div>

              <Button
                onClick={copyToClipboard}
                variant="secondary"
                className="w-full"
              >
                📋 Copy Token
              </Button>

              {expiresAt && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Expires:</span>{" "}
                  {new Date(expiresAt).toLocaleString()}
                </div>
              )}

              {tokenInfo && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">
                    Token Payload:
                  </p>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                    {JSON.stringify(tokenInfo, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Token Usage */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            How to Use Tokens
          </h3>

          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm font-medium text-gray-900 mb-1">
                1. Backend API Call
              </p>
              <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded mt-2">
                {`fetch('https://api.yourbackend.com/user', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})`}
              </pre>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm font-medium text-gray-900 mb-1">
                2. Verify Token (Backend)
              </p>
              <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded mt-2">
                {`// Verify with Shopify's public key
const payload = jwt.verify(token, publicKey)
const userId = payload.sub
const scopes = payload.scope`}
              </pre>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm font-medium text-gray-900 mb-1">
                3. Token Refresh
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Tokens expire after 1 hour. Generate a new token before expiry.
              </p>
            </div>
          </div>
        </Card>

        {/* Security Notes */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            Security Best Practices
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-orange-600">⚠️</span>
              <span>Never expose tokens in URLs or logs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">⚠️</span>
              <span>Always use HTTPS for API calls with tokens</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600">⚠️</span>
              <span>Implement token refresh before expiry</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Store tokens in secure storage if needed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Request minimal required scopes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span>Validate tokens on your backend</span>
            </li>
          </ul>
        </Card>

        {/* Usage Example */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Usage Example</h3>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
            {`import { useGenerateUserToken } from '@shopify/shop-minis-react'

function ApiConnector() {
  const { generateToken, loading, error } = useGenerateUserToken()
  const [userData, setUserData] = useState(null)

  const fetchUserData = async () => {
    try {
      // Generate token with specific scopes
      const { token } = await generateToken({
        scopes: ['read_profile', 'read_orders']
      })

      // Use token for backend API call
      const response = await fetch('https://api.example.com/user', {
        headers: {
          'Authorization': \`Bearer \${token}\`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      setUserData(data)
    } catch (err) {
      console.error('Failed to fetch user data:', err)
    }
  }

  return (
    <Button onClick={fetchUserData}>
      {loading ? 'Authenticating...' : 'Fetch User Data'}
    </Button>
  )
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
}
