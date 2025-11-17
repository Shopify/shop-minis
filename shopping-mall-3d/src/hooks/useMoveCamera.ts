import { useCallback, useRef } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";

export const useMoveCamera = (duration: number = 1) => {
  const camera = useThree((state) => state.camera);

  // Refs to store animation state
  const isAnimating = useRef(false);
  const startPosition = useRef(new THREE.Vector3());
  const targetPosition = useRef(new THREE.Vector3());
  const startQuaternion = useRef(new THREE.Quaternion());
  const targetQuaternion = useRef(new THREE.Quaternion());
  const animationProgress = useRef(0);
  const animationDuration = useRef(duration);

  useFrame((_, delta) => {
    if (!isAnimating.current) return;

    // Update progress
    animationProgress.current += delta / animationDuration.current;
    const progress = Math.min(1, animationProgress.current);

    // Smoothly interpolate position
    camera.position.lerpVectors(
      startPosition.current,
      targetPosition.current,
      progress
    );

    // Smoothly interpolate rotation using quaternions
    camera.quaternion.slerpQuaternions(
      startQuaternion.current,
      targetQuaternion.current,
      progress
    );

    // Check if animation is complete
    if (progress === 1) {
      isAnimating.current = false;
    }
  });

  const moveCameraTo = useCallback(
    (position: THREE.Vector3) => {
      if (!camera) return;

      const currentCameraPosition = camera.position.clone();

      // Store start position and rotation
      startPosition.current.copy(currentCameraPosition);
      startQuaternion.current.copy(camera.quaternion);

      // Calculate target position
      targetPosition.current.set(position.x, position.y, position.z);

      // Calculate target rotation
      targetQuaternion.current.setFromRotationMatrix(
        new THREE.Matrix4().lookAt(
          currentCameraPosition,
          targetPosition.current,
          new THREE.Vector3(0, 1, 0)
        )
      );

      // Reset and start animation
      animationProgress.current = 0;
      isAnimating.current = true;
    },
    [camera]
  );

  return { moveCameraTo };
};
