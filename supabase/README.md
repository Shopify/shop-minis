# Supabase Edge Functions for Shop Minis

A complete authentication and API solution for Shop Minis apps. This reference implementation shows how to securely authenticate Shop Mini users and process their requests using Supabase Edge Functions. This guide can be extrapolated to other cloud base providers.

## Overview

This solution provides:
- **JWT-based authentication** - Exchange Shop Mini tokens for custom JWTs
- **Secure API endpoints** - Protected endpoints using JWT verification
- **Image processing example** - Background removal using fal.ai
- **No database required** - Completely stateless architecture

## Project Structure

```
functions/
├── _shared/                # Shared utilities
│   ├── cors.ts            # CORS handling
│   ├── jwt-utils.ts       # JWT creation/verification
│   └── responses.ts       # Response helpers
├── auth/                  # Auth endpoint
│   ├── index.ts           # Main function
│   └── shopify-admin.ts   # Shop Mini token verification
└── remove-background/      # Image processing example
    └── index.ts           # Background removal function
```

## How It Works

### Authentication Flow

1. **Mini app** sends Shop Mini token to `/auth` endpoint
2. **Auth function** verifies token with Shopify Admin API
3. **Auth function** creates and returns JWT (7-day expiration)
4. **Mini app** stores JWT securely and uses it for all API calls
5. **API endpoints** verify JWT locally (no external calls)

```
┌──────────┐          ┌──────────────┐          ┌──────────────────┐
│          │          │              │          │                  │
│ Mini App │          │ Auth Function│          │ Shopify Admin API│
│          │          │              │          │                  │
└────┬─────┘          └──────┬───────┘          └─────────┬────────┘
     │                       │                            │
     │  Shop Mini Token      │                            │
     ├──────────────────────►│                            │
     │                       │                            │
     │                       │   Verify Token             │
     │                       ├───────────────────────────►│
     │                       │                            │
     │                       │   User Info (publicId)     │
     │                       │◄───────────────────────────┤
     │                       │                            │
     │   JWT Token           │                            │
     │◄──────────────────────┤                            │
     │                       │                            │
     │                                                    │
     │                  ┌──────────────┐                  │
     │                  │              │                  │
     │                  │ API Endpoints│                  │
     │                  │              │                  │
     │                  └──────┬───────┘                  │
     │                         │                          │
     │   JWT Token             │                          │
     ├────────────────────────►│                          │
     │                         │                          │
     │   Response              │                          │
     │◄────────────────────────┤                          │
     │                         │                          │
```

## Setup Guide

### 1. Generate JWT Secret Key

Generate a secure 256-bit (32-byte) secret key:

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 2: Using OpenSSL
openssl rand -base64 32

# Option 3: Using Python
python3 -c "import secrets; import base64; print(base64.b64encode(secrets.token_bytes(32)).decode())"
```

### 2. Get Your Shop Minis Admin API Key

Shop Minis Admin API requests are authenticated using an API key. Your API key will be generated when you first run the `npx shop-minis setup` command. You can find it in your project's `.env` file.

### 3. Configure Supabase Secrets

```bash
# Set your secrets
supabase secrets set JWT_SECRET_KEY="YOUR_GENERATED_SECRET_KEY"
supabase secrets set SHOP_MINIS_ADMIN_API_KEY="YOUR_SHOP_MINIS_ADMIN_KEY"

# Verify they're set
supabase secrets list
```

### 4. Deploy Functions

```bash
# Deploy all functions with --no-verify-jwt flag
supabase functions deploy auth --no-verify-jwt
supabase functions deploy remove-background --no-verify-jwt
```

**Important**: The `--no-verify-jwt` flag is REQUIRED because these functions use custom JWT tokens, not Supabase's built-in authentication.


## Mini App Implementation

### Complete Authentication Hook

Create a reusable authentication hook in your Mini app:

```typescript
// hooks/useAuth.ts
import { useGenerateUserToken, useSecureStorage } from '@shopify/shop-minis-react'
import { useCallback, useEffect, useState } from 'react'

const AUTH_API = 'https://YOUR_PROJECT.supabase.co/functions/v1/auth'

interface AuthData {
  token: string
  expiresAt: number
}

export function useAuth() {
  const { generateUserToken } = useGenerateUserToken()
  const { getSecret, setSecret, removeSecret } = useSecureStorage()
  const [jwtToken, setJwtToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load stored token on mount
  useEffect(() => {
    async function loadToken() {
      try {
        const stored = await getSecret()
        if (stored) {
          const data: AuthData = JSON.parse(stored)
          // Check if still valid (with 1 day buffer)
          if (data.expiresAt > Date.now() + 86400000) {
            setJwtToken(data.token)
          } else {
            await removeSecret() // Clear expired token
          }
        }
      } catch (error) {
        console.error('Failed to load token:', error)
      }
    }
    loadToken()
  }, [getSecret, removeSecret])

  // Get or refresh JWT token
  const getValidToken = useCallback(async (): Promise<string> => {
    // Check if current token is still valid
    if (jwtToken) {
      const stored = await getSecret()
      if (stored) {
        const data: AuthData = JSON.parse(stored)
        if (data.expiresAt > Date.now() + 86400000) {
          return jwtToken
        }
      }
    }

    // Get new token
    setIsLoading(true)
    try {
      // Get Shop Mini token
      const result = await generateUserToken()
      if (!result.data?.token) {
        throw new Error('Failed to generate Shop Mini token')
      }

      // Exchange for JWT
      const response = await fetch(AUTH_API, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${result.data.token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Authentication failed')
      }

      const { token, expiresIn } = await response.json()
      
      // Store securely
      const authData: AuthData = {
        token,
        expiresAt: Date.now() + (expiresIn * 1000)
      }
      await setSecret({ value: JSON.stringify(authData) })
      
      setJwtToken(token)
      return token
    } finally {
      setIsLoading(false)
    }
  }, [jwtToken, generateUserToken, getSecret, setSecret])

  // Clear authentication
  const clearAuth = useCallback(async () => {
    await removeSecret()
    setJwtToken(null)
  }, [removeSecret])

  return { getValidToken, clearAuth, isLoading, isAuthenticated: !!jwtToken }
}
```

### Using the Auth Hook

```typescript
// Example: API service using authentication
import { useAuth } from './hooks/useAuth'

export function useBackgroundRemoval() {
  const { getValidToken } = useAuth()
  
  const removeBackground = async (imageBase64: string) => {
    const token = await getValidToken()
    
    const response = await fetch(
      'https://YOUR_PROJECT.supabase.co/functions/v1/remove-background',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageBase64 })
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to remove background')
    }
    
    return response.json()
  }
  
  return { removeBackground }
}
```

### Auto-authenticate on App Load

```typescript
// App.tsx
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'

function App() {
  const { getValidToken } = useAuth()
  
  useEffect(() => {
    // Authenticate on app load
    getValidToken().catch(console.error)
  }, [])
  
  return (
    // Your app components
  )
}
```

## API Reference

### Auth Endpoint

**POST** `/functions/v1/auth`

Exchanges Shop Mini token for JWT.

**Headers:**
- `Authorization: Bearer {SHOP_MINI_TOKEN}`
- `Content-Type: application/json`

**Response:**
```json
{
  "token": "eyJhbGciOi...",
  "expiresIn": 604800  // 7 days in seconds
}
```

### Protected Endpoints

All other endpoints require JWT authentication.

**Headers:**
- `Authorization: Bearer {JWT_TOKEN}`
- `Content-Type: application/json`

**Example - Remove Background:**

**POST** `/functions/v1/remove-background`

```json
{
  "image": "data:image/jpeg;base64,..."
}
```

## Shared Utilities

### CORS Helper (`_shared/cors.ts`)
```typescript
handleCors(req)        // Handle preflight requests
corsHeaders(headers)   // Add CORS headers to response
```

### Response Helpers (`_shared/responses.ts`)
```typescript
successResponse(data)           // 200 with data
errorResponse(msg, status)      // Error with status code
requireMethod(req, method)      // Validate HTTP method
validateEnvVars(vars)          // Check environment variables
```

### JWT Utilities (`_shared/jwt-utils.ts`)
```typescript
createJWT(publicId, userState, secret, days)  // Create JWT
verifyJWT(token, secret)                      // Verify & decode JWT
extractBearerToken(authHeader)                // Extract token from header
```

## Security Best Practices

1. **Secure Storage Only** - Never use localStorage for tokens. Always use `useSecureStorage` from Shop Minis SDK
2. **Generate Your Own Secret** - Don't copy example keys from documentation
3. **Token Expiration** - JWTs expire after 7 days. Refresh proactively when < 1 day remains
4. **HTTPS Only** - All API calls must use HTTPS
5. **No Secrets in Code** - Use environment variables for all secrets

## Testing

### Test Auth Endpoint
```bash
# Get Shop Mini token from your app first
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/auth \
  -H "Authorization: Bearer YOUR_SHOP_MINI_TOKEN" \
  -H "Content-Type: application/json"
```

### Test Protected Endpoint
```bash
# Use JWT from auth response
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/remove-background \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"image": "data:image/jpeg;base64,..."}'
```

### View Function Logs
```bash
supabase functions logs auth --follow
supabase functions logs remove-background --follow
```

## Common Issues & Solutions

### 401 Unauthorized
- **Cause**: Function deployed without `--no-verify-jwt` flag
- **Solution**: Redeploy with `supabase functions deploy auth --no-verify-jwt`

### Token Expired Errors
- **Cause**: JWT older than 7 days
- **Solution**: Call `getValidToken()` which auto-refreshes expired tokens

### CORS Errors
- **Cause**: Missing CORS headers
- **Solution**: Use the shared `handleCors()` utility in all functions

## Advanced Topics

### Custom Token Expiration
Modify the expiration in `auth/index.ts`:
```typescript
const jwtToken = await createJWT(
  verification.publicId,
  verification.userState,
  JWT_SECRET_KEY!,
  30  // 30 days instead of 7
)
```

### Adding User Data to JWT
Extend the JWT payload in `_shared/jwt-utils.ts`:
```typescript
interface JWTPayload {
  publicId: string
  userState: string
  customData?: any  // Add your fields
  exp: number
  iat: number
}
```

### Rate Limiting
Add rate limiting using Supabase's built-in features or implement custom logic.

## Contributing

This is an open-source reference implementation. Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Test your changes thoroughly
4. Submit a pull request

## License

MIT - Use this code freely in your Shop Mini projects.

## Support

- **Shop Minis Documentation**: [shopify.dev/docs/shop-minis](https://shopify.dev/docs/api/shop-minis)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Issues**: Open an issue in the repository

---

Built with ❤️ for the Shop Minis developer community