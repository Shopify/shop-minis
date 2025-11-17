import * as THREE from 'three'

export function getCenter(node: THREE.Object3D) {
  const boundingBox = new THREE.Box3().setFromObject(node)
  const center = new THREE.Vector3()
  boundingBox.getCenter(center)
  return center
}
