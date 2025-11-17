import { Canvas } from "@react-three/fiber";
import { Environment } from "./components/Environment";
import { Mall } from "./components/Mall";
import { CAMERA_FOCAL_LENGTH, focalLengthToFov } from "./utils/camera";
import { CameraRotationController } from "./components/CameraRotationController";
import { useShops } from "./hooks/useShops";
import { INITIAL_PLAYER_POSITION } from "./utils/mall";

const DEBUG_MODE = false;

export default function App() {
  const { shops } = useShops();

  return (
    <Canvas
      shadows
      camera={{
        position: INITIAL_PLAYER_POSITION,
        fov: focalLengthToFov(CAMERA_FOCAL_LENGTH),
      }}
    >
      <color attach="background" args={["#C4CBC0"]} />

      <CameraRotationController />

      {shops && <Mall shops={shops} debug={DEBUG_MODE} />}

      <Environment debug={DEBUG_MODE} />
    </Canvas>
  );
}
