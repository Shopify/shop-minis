import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// @ts-ignore - three module types
import * as THREE from "three";
import {
  useNavigateWithTransition,
  Card,
  Button,
  Touchable,
  Label,
} from "@shopify/shop-minis-react";

// Rotating Box Component
function Box({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      {/* @ts-ignore */}
      <meshStandardMaterial color={hovered ? "hotpink" : color} />
    </mesh>
  );
}

// Animated Sphere Component
function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.7, 32, 32]} />
      {/* @ts-ignore */}
      <meshStandardMaterial color="#4F46E5" roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

// Torus Knot Component
function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshNormalMaterial />
    </mesh>
  );
}

// Particle System
function Particles() {
  const points = useRef<THREE.Points>(null);
  const particlesCount = 500;

  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        {/* @ts-ignore - React Three Fiber type mismatch */}
        <bufferAttribute
          attach="attributes-position"
          // @ts-ignore
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      {/* @ts-ignore */}
      <pointsMaterial size={0.05} color="#8B5CF6" />
    </points>
  );
}

export function ThreeDLibraries() {
  const navigate = useNavigateWithTransition();
  const [activeDemo, setActiveDemo] = useState<
    "boxes" | "sphere" | "torus" | "particles"
  >("boxes");
  const [bgColor, setBgColor] = useState("#f3f4f6");

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
            <h1 className="text-lg font-bold text-gray-900">3D Graphics</h1>
            <p className="text-xs text-gray-600">
              Three.js & React Three Fiber
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Demo Selection */}
        <div className="bg-white border-b p-4">
          <div className="grid grid-cols-4 gap-2">
            <Button
              onClick={() => setActiveDemo("boxes")}
              variant={activeDemo === "boxes" ? "default" : "secondary"}
              size="sm"
            >
              Boxes
            </Button>
            <Button
              onClick={() => setActiveDemo("sphere")}
              variant={activeDemo === "sphere" ? "default" : "secondary"}
              size="sm"
            >
              Sphere
            </Button>
            <Button
              onClick={() => setActiveDemo("torus")}
              variant={activeDemo === "torus" ? "default" : "secondary"}
              size="sm"
            >
              Torus
            </Button>
            <Button
              onClick={() => setActiveDemo("particles")}
              variant={activeDemo === "particles" ? "default" : "secondary"}
              size="sm"
            >
              Particles
            </Button>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="relative bg-gray-100" style={{ height: "400px" }}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ background: bgColor }}
          >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

            <Suspense fallback={null}>
              {activeDemo === "boxes" && (
                <>
                  <Box position={[-1.5, 0, 0]} color="orange" />
                  <Box position={[1.5, 0, 0]} color="skyblue" />
                  <Box position={[0, 1.5, 0]} color="lightgreen" />
                  <Box position={[0, -1.5, 0]} color="hotpink" />
                </>
              )}
              {activeDemo === "sphere" && <Sphere />}
              {activeDemo === "torus" && <TorusKnot />}
              {activeDemo === "particles" && <Particles />}
            </Suspense>
          </Canvas>

          {/* Canvas Instructions */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-2 rounded text-xs">
            {activeDemo === "boxes" &&
              "Click boxes to scale, hover to change color"}
            {activeDemo === "sphere" &&
              "Animated sphere with metallic material"}
            {activeDemo === "torus" &&
              "Rotating torus knot with normal material"}
            {activeDemo === "particles" && "500 rotating particles"}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Scene Controls */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Scene Controls</h3>
            <div className="space-y-3">
              <div>
                <Label>
                  Background Color
                </Label>
                <div className="flex gap-2">
                  {["#f3f4f6", "#1f2937", "#3b82f6", "#10b981"].map((color) => (
                              <Touchable
                      key={color}
                      onClick={() => setBgColor(color)}
                      className="w-10 h-10 rounded border-2"
                      style={{
                        backgroundColor: color,
                        borderColor: bgColor === color ? "#3b82f6" : "#e5e7eb",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Demo Info */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              {activeDemo === "boxes" && "Interactive Boxes"}
              {activeDemo === "sphere" && "Animated Sphere"}
              {activeDemo === "torus" && "Torus Knot"}
              {activeDemo === "particles" && "Particle System"}
            </h3>
            <p className="text-sm text-gray-600">
              {activeDemo === "boxes" &&
                "Four colored boxes that rotate continuously. Click to scale them up/down, hover to see color changes."}
              {activeDemo === "sphere" &&
                "A metallic sphere that moves up and down using sine wave animation."}
              {activeDemo === "torus" &&
                "A torus knot with normal material showing surface normals as colors."}
              {activeDemo === "particles" &&
                "A cloud of 500 particles rotating in 3D space."}
            </p>
          </Card>

          {/* 3D Primitives */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">3D Primitives</h3>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-1">📦</div>
                <div>Box</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🔵</div>
                <div>Sphere</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🔺</div>
                <div>Cone</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">⭕</div>
                <div>Torus</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">💠</div>
                <div>Octahedron</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🔷</div>
                <div>Tetrahedron</div>
              </div>
            </div>
          </Card>

          {/* Materials */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Materials</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span>MeshBasicMaterial - No lighting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>MeshStandardMaterial - PBR material</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded"></div>
                <span>MeshNormalMaterial - Shows normals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span>MeshLambertMaterial - Non-shiny</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-600 rounded"></div>
                <span>MeshPhongMaterial - Shiny</span>
              </div>
            </div>
          </Card>

          {/* Features */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              React Three Fiber Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Declarative Three.js with React components</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Auto resize & responsive canvas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Built-in interaction handlers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>useFrame hook for animations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Suspense support for loading</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>WebGL performance optimizations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Mobile touch support</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
