import {getCenter} from '../utils/boundingbox'
import {Text3D} from './Text3D'
import type {StoreNodes} from '../types/storeNodes'
import {useProductsByShop} from '../hooks/useProductsByShop'
import {CashierBox} from './CashierBox'
import {ProductsTable} from './ProductsTable'
import {ShopLogoFrame} from './ShopLogoFrame'
import {ProductShelf} from './ProductShelf'

export interface Shop {
  id: string
  name: string
  logoImage: {
    url: string
  }
}

export function Store({nodes, shop}: {nodes: StoreNodes; shop: Shop}) {
  const {products} = useProductsByShop(shop.id)

  const centerSign = getCenter(nodes.sign)
  const tableCenter = getCenter(nodes.table)

  return (
    <>
      <Text3D
        key={shop.name}
        position={[centerSign.x + 0.05, centerSign.y - 0.54, centerSign.z]}
        fontSize={0.15}
        color="#111"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
        letterSpacing={-0.02}
      >
        {shop.name}
      </Text3D>

      <ShopLogoFrame
        imageUrl={shop.logoImage.url}
        position={[centerSign.x - 1, tableCenter.y + 1.4, tableCenter.z]}
      />

      <ProductsTable table={nodes.table} products={products} />

      <CashierBox cashier={nodes.cashier} shopId={shop.id} />

      <ProductShelf shelf={nodes.shelf} products={products} />
    </>
  )
}
