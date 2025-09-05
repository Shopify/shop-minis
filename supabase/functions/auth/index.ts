/**
 * Daily Fits Auth Function
 * Validates Shop Mini tokens and issues JWT tokens for subsequent API calls
 */

import { createJWT, extractBearerToken } from "../_shared/jwt-utils.ts";
import { handleCors, errorResponse, successResponse, requireMethod, validateEnvVars } from "../_shared/responses.ts";
import { verifyShopMiniToken } from "./shopify-admin.ts";

// Configuration from environment
const SHOPIFY_ADMIN_API_URL = "https://server.shop.app/minis/admin-api/alpha/graphql.json";
const SHOP_MINIS_ADMIN_API_KEY = Deno.env.get("SHOP_MINIS_ADMIN_API_KEY");
const JWT_SECRET_KEY = Deno.env.get("JWT_SECRET_KEY");

Deno.serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;
  
  // Only accept POST requests
  const methodCheck = requireMethod(req, "POST");
  if (methodCheck) return methodCheck;
  
  try {
    // Validate environment configuration
    const envError = validateEnvVars({
      SHOP_MINIS_ADMIN_API_KEY,
      JWT_SECRET_KEY
    });
    if (envError) throw new Error(envError);
    
    // Extract and validate Shop Mini token
    const shopMiniToken = extractBearerToken(req.headers.get("Authorization"));
    if (!shopMiniToken) {
      return errorResponse("Authorization header with Bearer token required", 401);
    }
    
    // Verify Shop Mini token with Admin API
    const verification = await verifyShopMiniToken(
      shopMiniToken,
      SHOPIFY_ADMIN_API_URL,
      SHOP_MINIS_ADMIN_API_KEY!
    );
    
    if (!verification.isValid) {
      return errorResponse(verification.error || "Invalid Shop Mini token", 401);
    }
    
    // Create JWT token with 7-day expiration using publicId
    if (!verification.publicId) {
      return errorResponse("Public ID not available for this user", 400);
    }
    
    const jwtToken = await createJWT(
      verification.publicId,
      verification.userState!,
      JWT_SECRET_KEY!,
      7
    );
    
    // Return JWT token to client
    return successResponse({
      token: jwtToken,
      expiresIn: 7 * 24 * 60 * 60 // 7 days in seconds
    });
    
  } catch (error: any) {
    console.error("Auth error:", error);
    return errorResponse("Authentication failed", 500, error.message);
  }
});