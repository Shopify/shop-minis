/**
 * JWT Utilities for Daily Fits Mini App
 * Provides JWT creation and verification using Web Crypto API
 */

interface JWTPayload {
  publicId: string;  // Using publicId as the primary identifier
  userState: string;
  exp: number;
  iat: number;
}

interface JWTHeader {
  alg: string;
  typ: string;
}

/**
 * Encode data to base64url format (JWT standard)
 */
function base64UrlEncode(data: string | Uint8Array): string {
  const base64 = typeof data === 'string' 
    ? btoa(data)
    : btoa(String.fromCharCode(...data));
  
  return base64
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Decode base64url to string
 */
function base64UrlDecode(str: string): string {
  const base64 = str
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(str.length + (4 - str.length % 4) % 4, '=');
  
  return atob(base64);
}

/**
 * Import secret key for HMAC operations
 */
async function importSecretKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    {
      name: 'HMAC',
      hash: 'SHA-256'
    },
    false,
    ['sign', 'verify']
  );
}

/**
 * Create a signed JWT token
 */
export async function createJWT(
  publicId: string,
  userState: string,
  secretKey: string,
  expirationDays: number = 7
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const expirationSeconds = expirationDays * 24 * 60 * 60;
  
  const header: JWTHeader = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const payload: JWTPayload = {
    publicId,
    userState,
    iat: now,
    exp: now + expirationSeconds
  };
  
  // Encode header and payload
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const message = `${encodedHeader}.${encodedPayload}`;
  
  // Sign the message
  const key = await importSecretKey(secretKey);
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message)
  );
  
  // Create final JWT
  const encodedSignature = base64UrlEncode(new Uint8Array(signature));
  return `${message}.${encodedSignature}`;
}

/**
 * Verify and decode a JWT token
 * Returns the payload if valid, throws error if invalid
 */
export async function verifyJWT(
  token: string,
  secretKey: string
): Promise<JWTPayload> {
  const parts = token.split('.');
  
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }
  
  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const message = `${encodedHeader}.${encodedPayload}`;
  
  // Verify signature
  const key = await importSecretKey(secretKey);
  const encoder = new TextEncoder();
  const signatureBytes = new Uint8Array(
    base64UrlDecode(encodedSignature).split('').map(c => c.charCodeAt(0))
  );
  
  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    encoder.encode(message)
  );
  
  if (!isValid) {
    throw new Error('Invalid JWT signature');
  }
  
  // Decode and validate payload
  const payload: JWTPayload = JSON.parse(base64UrlDecode(encodedPayload));
  
  // Check expiration
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    throw new Error('JWT token has expired');
  }
  
  return payload;
}

/**
 * Extract JWT from Authorization header
 */
export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}