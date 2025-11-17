import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

// Global cache that persists across component remounts (StrictMode safe)
const gltfCache = new Map<string, GLTF>();
const loadingPromises = new Map<string, Promise<GLTF>>();

/**
 * Custom hook to load GLTF/GLB files without drei
 * Replacement for @react-three/drei's useGLTF
 * Includes caching to prevent reloading on StrictMode remounts
 */
export function useGLTFLoader(url: string) {
  const [gltf, setGltf] = useState<GLTF | null>(
    () => gltfCache.get(url) || null
  );
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(!gltfCache.has(url));

  useEffect(() => {
    // Return early if already cached
    if (gltfCache.has(url)) {
      setGltf(gltfCache.get(url)!);
      setLoading(false);
      return;
    }

    // Return early if already loading
    if (loadingPromises.has(url)) {
      loadingPromises.get(url)!.then(
        (loadedGltf) => {
          setGltf(loadedGltf);
          setLoading(false);
        },
        (err) => {
          setError(err);
          setLoading(false);
        }
      );
      return;
    }

    // Start loading
    const loader = new GLTFLoader();
    const loadPromise = new Promise<GLTF>((resolve, reject) => {
      loader.load(
        url,
        (loadedGltf: any) => {
          gltfCache.set(url, loadedGltf);
          loadingPromises.delete(url);
          resolve(loadedGltf);
        },
        undefined,
        (err: any) => {
          loadingPromises.delete(url);
          reject(err);
        }
      );
    });

    loadingPromises.set(url, loadPromise);

    loadPromise.then(
      (loadedGltf) => {
        setGltf(loadedGltf);
        setLoading(false);
      },
      (err) => {
        setError(err as Error);
        setLoading(false);
      }
    );
  }, [url]);

  // Extract nodes from the scene - traverse all objects and create a flat map by name
  const nodes = gltf?.scene
    ? (() => {
        const nodeMap: Record<string, any> = {};
        gltf.scene.traverse((object) => {
          if (object.name) {
            nodeMap[object.name] = object;
          }
        });
        return nodeMap;
      })()
    : undefined;

  return {
    scene: gltf?.scene,
    nodes: nodes as any, // Match drei's nodes structure
    animations: gltf?.animations,
    loading,
    error,
  };
}
