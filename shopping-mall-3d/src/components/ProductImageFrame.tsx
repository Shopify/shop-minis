import {TextureLoader} from 'three'
import {useLoader} from '@react-three/fiber'

type FrameProps = {
  imageUrl: string
  position?: [number, number, number]
  frameSize?: number
  rotation?: [number, number, number]
  onClick?: () => void
}

export function ProductImageFrame({
  imageUrl,
  position = [0, 0, 0.51],
  frameSize = 0.5,
  rotation = [0, 0, 0],
  onClick = () => {},
}: FrameProps) {
  const texture = useLoader(TextureLoader, imageUrl)
  const frameColor = '#F3F9EF'

  return (
    <group position={position} rotation={rotation} onClick={onClick}>
      <mesh>
        <boxGeometry args={[frameSize, frameSize, 0.05]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[frameSize - 0.04, frameSize - 0.04]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  )
}
