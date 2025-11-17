import * as THREE from 'three'
import {useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import {getCenter} from '../utils/boundingbox'
import {ProductCard} from './ProductCard'
import type {Product} from '../types/product'

const CARD_SPACING = 0.55

interface ProductsTableProps {
  table: THREE.Object3D
  products: Product[] | null
}

export function ProductsTable({table, products}: ProductsTableProps) {
  const tableCenter = getCenter(table)
  const boundingBox = new THREE.Box3().setFromObject(table)
  const tableSize = new THREE.Vector3()
  boundingBox.getSize(tableSize)

  // Create refs for the rotating cards
  const cardRefs = [
    useRef<THREE.Group>(null!),
    useRef<THREE.Group>(null!),
    useRef<THREE.Group>(null!),
    useRef<THREE.Group>(null!),
  ]

  // Animation frame
  useFrame((_, delta) => {
    cardRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.rotation.y += delta * (0.5 + index * 0.2)
      }
    })
  })

  return (
    <>
      {/* Product Cards */}
      {products &&
        products
          .slice(0, 4)
          .map((product, index) => (
            <ProductCard
              key={product.id || index}
              product={product}
              position={[
                tableCenter.x,
                tableCenter.y + 0.55,
                tableCenter.z - CARD_SPACING * 1.5 + index * CARD_SPACING,
              ]}
              cardRef={cardRefs[index]}
            />
          ))}
    </>
  )
}
