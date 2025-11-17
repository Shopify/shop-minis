import { useEffect, useState, useMemo } from "react";
import * as THREE from "three";

import mallObjects from "../assets/3d-low-poly-shoppingmall-scene.glb";
import { useGLTFLoader } from "../hooks/useGLTFLoader";
import { Store, type Shop } from "./Store";
import { MallSpace } from "./MallSpace";
import type { StoreNodes } from "../types/storeNodes";
import {
  createMall,
  getPositionFromLocation,
  INITIAL_PLAYER_LOCATION,
  type MallLocationType,
  type MallSpaceType,
} from "../utils/mall";
import { useMoveCamera } from "../hooks/useMoveCamera";

export function Mall({
  shops,
  debug = false,
}: {
  shops: Array<Shop>;
  debug?: boolean;
}) {
  const { moveCameraTo } = useMoveCamera();
  const [playerLocation, setPlayerLocation] = useState<MallLocationType>(
    INITIAL_PLAYER_LOCATION
  );
  const [mall] = useState<MallSpaceType>(createMall());

  const NUM_SHOPS = 3;

  // Randomize shops and select 3
  const selectedShops = useMemo(() => {
    if (!shops || shops.length === 0) return [];

    // Create a copy of the shops array to avoid mutating the original
    const shuffled = [...shops];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return the first 3 shops from the shuffled array
    return shuffled.slice(0, NUM_SHOPS);
  }, [shops]);

  const { scene, nodes, loading } = useGLTFLoader(mallObjects);

  useEffect(() => {
    if (scene) {
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          object.castShadow = true;

          if (object.name.toLocaleLowerCase().includes("ground")) {
            object.receiveShadow = true;
          }
          if (object.name.toLocaleLowerCase().includes("wall")) {
            object.receiveShadow = true;
          }
        }
      });
    }
  }, [scene]);

  // Show scene even while loading stores
  if (!selectedShops || selectedShops.length < 3 || loading || !nodes) {
    // Still render the base scene if available
    return scene ? <primitive object={scene} /> : null;
  }

  const storeNodes: StoreNodes[] = [];

  for (let i = 0; i < NUM_SHOPS; i++) {
    storeNodes.push({
      table: nodes[`ProductsTable${i + 1}`],
      cashier: nodes[`Cashier${i + 1}`],
      sign: nodes[`Sign${i + 1}`],
      shelf: nodes[`Shelf${i + 1}`],
    });
  }

  return (
    <>
      {scene && <primitive object={scene} />}

      {storeNodes.map((nodes, index) => {
        return <Store shop={selectedShops[index]} nodes={nodes} key={index} />;
      })}

      <MallSpace
        mall={mall}
        playerLocation={playerLocation}
        debug={debug}
        onItemClick={(location: MallLocationType) => {
          setPlayerLocation(location);
          moveCameraTo(getPositionFromLocation(location));
        }}
      />
    </>
  );
}
