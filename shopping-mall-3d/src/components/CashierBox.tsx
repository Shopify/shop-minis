import {getCenter} from '../utils/boundingbox'
import * as THREE from 'three'

interface CashierBoxProps {
  cashier: THREE.Object3D
  shopId: string
}

export function CashierBox({cashier, shopId}: CashierBoxProps) {
  const center = getCenter(cashier)
  const boundingBox = new THREE.Box3().setFromObject(cashier)
  const size = new THREE.Vector3()
  boundingBox.getSize(size)

  return (
    <mesh
      position={center}
      onClick={() => {
        window.minisSDK.navigateToCheckout({shopId: shopId})
      }}
    >
      <boxGeometry args={[size.x, size.y, size.z]} />
      <meshStandardMaterial color="grey" transparent={true} opacity={0.01} />
    </mesh>
  )
}
