import {Text3D} from './Text3D'

type PriceTagProps = {
  price: string
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function PriceTag({
  price,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: PriceTagProps) {
  const tagWidth = 0.3
  const tagHeight = 0.18
  const tagDepth = 0.01
  const holeRadius = 0.015

  return (
    <group position={position} rotation={rotation}>
      {/* Main tag body */}
      <mesh>
        <boxGeometry args={[tagWidth, tagHeight, tagDepth]} />
        <meshStandardMaterial color="#D32F2F" />
      </mesh>

      {/* Stitching effect - dashed white border */}
      {/* Top stitching */}
      <mesh position={[0, tagHeight / 2 - 0.01, tagDepth / 2 + 0.001]}>
        <planeGeometry args={[tagWidth - 0.02, 0.003]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Bottom stitching */}
      <mesh position={[0, -tagHeight / 2 + 0.01, tagDepth / 2 + 0.001]}>
        <planeGeometry args={[tagWidth - 0.02, 0.003]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Left stitching */}
      <mesh position={[-tagWidth / 2 + 0.01, 0, tagDepth / 2 + 0.001]}>
        <planeGeometry args={[0.003, tagHeight - 0.02]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Right stitching */}
      <mesh position={[tagWidth / 2 - 0.01, 0, tagDepth / 2 + 0.001]}>
        <planeGeometry args={[0.003, tagHeight - 0.02]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Hole */}
      <mesh position={[-tagWidth / 2 + 0.04, tagHeight / 2 - 0.04, 0]}>
        <ringGeometry args={[holeRadius - 0.003, holeRadius, 16]} />
        <meshStandardMaterial color="#B8860B" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* String */}
      <mesh
        position={[-tagWidth / 2 + 0.04, tagHeight / 2 - 0.02, 0]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <cylinderGeometry args={[0.002, 0.002, 0.08, 8]} />
        <meshStandardMaterial color="#CCCCCC" />
      </mesh>

      {/* Price text */}
      <Text3D
        position={[0, 0, tagDepth / 2 + 0.002]}
        fontSize={0.06}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {price}
      </Text3D>
    </group>
  )
}
