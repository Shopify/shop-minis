import {useLoader} from '@react-three/fiber'
import {TextureLoader} from 'three'

type FrameProps = {
  imageUrl: string
  position?: [number, number, number]
}

export function ShopLogoFrame({imageUrl, position = [0, 0, 0.51]}: FrameProps) {
  const texture = useLoader(TextureLoader, imageUrl)
  const frameColor = '#8B6F4E'
  const frameSize = 1.2 // Square frame size

  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      <mesh>
        <boxGeometry args={[frameSize, frameSize, 0.07]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[frameSize - 0.12, frameSize - 0.12]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  )
}
