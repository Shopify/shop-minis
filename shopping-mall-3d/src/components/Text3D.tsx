import { useRef, useMemo } from "react";
import * as THREE from "three";

// We'll use a simple canvas-based text texture instead of TextGeometry
// This is lighter weight and doesn't require font files
interface Text3DProps {
  children: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  fontSize?: number;
  color?: string;
  anchorX?: "left" | "center" | "right";
  anchorY?: "top" | "middle" | "bottom";
  letterSpacing?: number;
}

export function Text3D({
  children,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  fontSize = 0.1,
  color = "white",
  anchorX = "center",
  anchorY = "middle",
  letterSpacing = 0,
}: Text3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    // Create a canvas to render text
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    // Set canvas size (higher resolution for better quality)
    const scale = 4;
    canvas.width = 1024 * scale;
    canvas.height = 256 * scale;

    // Configure text rendering
    context.fillStyle = "transparent";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const fontSizePx = 100 * scale;
    context.font = `bold ${fontSizePx}px Arial, sans-serif`;
    context.fillStyle = color;
    context.textBaseline = "middle";

    // Measure text
    const metrics = context.measureText(children);
    const textWidth = metrics.width;

    // Calculate position based on anchor
    let x = canvas.width / 2;
    if (anchorX === "left") x = 0;
    if (anchorX === "right") x = canvas.width;

    let y = canvas.height / 2;
    if (anchorY === "top") y = fontSizePx / 2;
    if (anchorY === "bottom") y = canvas.height - fontSizePx / 2;

    // Apply letter spacing by drawing each character
    if (letterSpacing !== 0) {
      const chars = children.split("");
      let currentX = x - (textWidth + letterSpacing * (chars.length - 1)) / 2;

      chars.forEach((char) => {
        context.fillText(char, currentX, y);
        currentX +=
          context.measureText(char).width + letterSpacing * fontSizePx;
      });
    } else {
      context.textAlign = anchorX;
      context.fillText(children, x, y);
    }

    // Create texture from canvas
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;

    return tex;
  }, [children, color, anchorX, anchorY, letterSpacing]);

  // Calculate plane size based on text
  const planeSize = useMemo(() => {
    const aspectRatio = 1024 / 256;
    const height = fontSize;
    const width = height * aspectRatio;
    return [width, height] as [number, number];
  }, [fontSize]);

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[...planeSize, 1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
