/**
 * CORS configuration and handlers
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400"
};

/**
 * Handle CORS preflight requests
 */
export function handleCors(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: CORS_HEADERS
    });
  }
  return null;
}

/**
 * Add CORS headers to response
 */
export function corsHeaders(additionalHeaders: HeadersInit = {}): HeadersInit {
  return {
    ...CORS_HEADERS,
    ...additionalHeaders
  };
}