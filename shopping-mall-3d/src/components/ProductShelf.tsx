import * as THREE from 'three'
import {getCenter} from '../utils/boundingbox'
import {ProductImageFrame} from './ProductImageFrame'
import type {Product} from '../types/product'

const CARD_SPACING = 0.4

interface ProductShelfProps {
  shelf: THREE.Object3D
  products: Product[] | null
}

export function ProductShelf({shelf, products}: ProductShelfProps) {
  const NUM_ROWS = 4
  const PRODUCTS_PER_ROW = 5
  const Y_SPACING = 0.38
  const center = getCenter(shelf)
  const boundingBox = new THREE.Box3().setFromObject(shelf)
  const tableSize = new THREE.Vector3()
  boundingBox.getSize(tableSize)

  return (
    <>
      {products &&
        products
          .slice(0, NUM_ROWS * PRODUCTS_PER_ROW) // Get 20 products total
          .map((product, index) => {
            const row = Math.floor(index / PRODUCTS_PER_ROW)
            const col = index % PRODUCTS_PER_ROW

            return (
              <ProductImageFrame
                key={product.id}
                imageUrl={product.featuredImage?.url ?? ''}
                position={[
                  center.x + 0.2, // keep fixed
                  center.y + 0.7 + -(row * Y_SPACING), // increase by 0.5 per row
                  center.z + -0.9 + CARD_SPACING * col, // position within row
                ]}
                frameSize={0.25}
                rotation={[0, Math.PI / 2, 0]}
                onClick={() => {
                  window.minisSDK.navigateToProduct({productId: product.id})
                }}
              />
            )
          })}
    </>
  )
}
