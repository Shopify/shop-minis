import { fal } from "npm:@fal-ai/client";
import { verifyJWT, extractBearerToken } from "../_shared/jwt-utils.ts";
import { handleCors, errorResponse, successResponse, requireMethod, validateEnvVars } from "../_shared/responses.ts";

interface RequestBody {
  image?: string;
}

interface FalResponse {
  data: {
    image: {
      url: string;
      content_type: string;
      file_name: string;
      file_size: number;
      width: number;
      height: number;
    }
  }
}

function base64ToBlob(base64String: string): Blob {
  const base64Data = base64String.includes(',') ? base64String.split(',')[1] : base64String;
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for(let i = 0; i < binaryString.length; i++){
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: 'image/jpeg' });
}

// Get JWT secret from environment
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
    const envError = validateEnvVars({ JWT_SECRET_KEY });
    if (envError) throw new Error(envError);
  
    // Extract and verify JWT token
    const jwtToken = extractBearerToken(req.headers.get("Authorization"));
    if (!jwtToken) {
      return errorResponse("Authorization header with Bearer JWT token required", 401);
    }
    
    // Verify JWT token
    let userInfo;
    try {
      userInfo = await verifyJWT(jwtToken, JWT_SECRET_KEY!);
    } catch (error: any) {
      return errorResponse(error.message || "Invalid or expired JWT token", 401);
    }
  
    // Parse JSON request body
    const body: RequestBody = await req.json();
    if (!body.image) {
      return errorResponse("Image field with base64 data is required", 400);
    }
    
    // Convert base64 to Blob
    const file = base64ToBlob(body.image);
    
    // Upload to fal.ai storage and process
    const url = await fal.storage.upload(file);
    const result = await fal.subscribe("fal-ai/birefnet/v2", {
      input: {
        image_url: url
      },
      logs: false
    }) as FalResponse;
    
    return successResponse(result.data);
    
  } catch (error: any) {
    console.error("Error processing request:", error);
    return errorResponse("Internal server error", 500, error.message);
  }
});