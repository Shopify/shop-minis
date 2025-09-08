/**
 * Standardized response helpers for Supabase Edge Functions
 */

import { corsHeaders } from "./cors.ts";
export { handleCors } from "./cors.ts";

/**
 * Create a JSON response with CORS headers
 */
export function jsonResponse(
  data: any,
  status: number = 200
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    })
  });
}

/**
 * Create an error response
 */
export function errorResponse(
  error: string,
  status: number = 500,
  details?: string
): Response {
  const body: any = { error };
  if (details) {
    body.details = details;
  }
  
  return jsonResponse(body, status);
}

/**
 * Create a success response
 */
export function successResponse(data: any): Response {
  return jsonResponse(data, 200);
}

/**
 * Check if request method is allowed
 */
export function requireMethod(req: Request, method: string): Response | null {
  if (req.method !== method) {
    return errorResponse(`Method not allowed. Use ${method}.`, 405);
  }
  return null;
}

/**
 * Validate required environment variables
 */
export function validateEnvVars(vars: Record<string, string | undefined>): string | null {
  for (const [name, value] of Object.entries(vars)) {
    if (!value) {
      return `${name} is not configured`;
    }
  }
  return null;
}