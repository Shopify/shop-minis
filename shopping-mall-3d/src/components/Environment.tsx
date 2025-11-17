import {useRef, useEffect} from 'react'
import {DirectionalLight, DirectionalLightHelper} from 'three'
import {useThree} from '@react-three/fiber'

interface EnvironmentProps {
  direction?: [number, number, number]
  debug?: boolean
}

export const Environment = ({
  direction = [5, 5, 5],
  debug = false,
}: EnvironmentProps) => {
  const directionalLight1 = useRef<DirectionalLight>(null)
  const directionalLight2 = useRef<DirectionalLight>(null)
  const directionalLight3 = useRef<DirectionalLight>(null)
  const directionalLight4 = useRef<DirectionalLight>(null)
  
  const {scene} = useThree()

  // Add helpers manually if debug is enabled
  useEffect(() => {
    if (!debug) return

    const helpers: DirectionalLightHelper[] = []
    
    if (directionalLight1.current) {
      const helper = new DirectionalLightHelper(directionalLight1.current, 5)
      scene.add(helper)
      helpers.push(helper)
    }
    if (directionalLight2.current) {
      const helper = new DirectionalLightHelper(directionalLight2.current, 5)
      scene.add(helper)
      helpers.push(helper)
    }
    if (directionalLight3.current) {
      const helper = new DirectionalLightHelper(directionalLight3.current, 5)
      scene.add(helper)
      helpers.push(helper)
    }
    if (directionalLight4.current) {
      const helper = new DirectionalLightHelper(directionalLight4.current, 5)
      scene.add(helper)
      helpers.push(helper)
    }

    return () => {
      helpers.forEach(helper => scene.remove(helper))
    }
  }, [debug, scene])

  return (
    <>
      <directionalLight
        ref={directionalLight1}
        position={direction}
        intensity={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.001}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        castShadow
      />
      <directionalLight
        ref={directionalLight2}
        position={[-5, 5, 5]}
        intensity={1}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-bias={-0.001}
        castShadow
      />
      <directionalLight
        ref={directionalLight3}
        position={[-5, 5, -5]}
        intensity={1}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-bias={-0.001}
        castShadow
      />
      <directionalLight
        ref={directionalLight4}
        position={[0, 5, 0]}
        intensity={1}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-bias={-0.001}
        castShadow
      />
      {/* Ambient light to replace Environment preset */}
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.3} groundColor="#444444" />
    </>
  )
}
