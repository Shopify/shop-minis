// Set up types for imported images and some other helpers
// https://vite.dev/guide/features.html#client-types
/// <reference types="vite/client" />

// Add type declaration for GLB files
declare module "*.glb" {
  const content: string;
  export default content;
}
