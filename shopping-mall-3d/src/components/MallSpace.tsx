import {
  MALL_FLOOR_HEIGHT,
  MALL_POSITION,
  MALL_SPACE_ITEM_SIZE,
  type MallLocationType,
  type MallSpaceType,
} from '../utils/mall'

const MALL_SPACE_ITEM_COLOR_ALLOWED = 'white'
const MALL_SPACE_ITEM_COLOR_DEBUG_ALLOWED = 'green'
const MALL_SPACE_ITEM_COLOR_DEBUG_NOT_ALLOWED = 'red'
const MALL_SPACE_ITEM_COLOR_DEBUG_OCCUPIED = 'blue'

export const MallSpace = ({
  mall,
  playerLocation,
  debug = false,
  onItemClick,
}: {
  mall: MallSpaceType
  playerLocation: MallLocationType
  debug: boolean
  onItemClick?: (location: MallLocationType) => void
}) => {
  return (
    <group>
      {mall.map((floor, floorIndex) => (
        <group
          key={floorIndex}
          position={[
            MALL_POSITION.x,
            MALL_POSITION.y + floorIndex * MALL_FLOOR_HEIGHT,
            MALL_POSITION.z,
          ]}
        >
          {floor.map((row, rowIndex) => (
            <group key={rowIndex}>
              {row.map((column, columnIndex) => {
                let color
                let opacity = 0

                if (debug) {
                  opacity = 1

                  if (
                    column.x === playerLocation.x &&
                    column.y === playerLocation.y &&
                    column.floor === playerLocation.floor
                  ) {
                    color = MALL_SPACE_ITEM_COLOR_DEBUG_OCCUPIED
                  } else if (column.isAllowed) {
                    color = MALL_SPACE_ITEM_COLOR_DEBUG_ALLOWED
                  } else {
                    color = MALL_SPACE_ITEM_COLOR_DEBUG_NOT_ALLOWED
                  }
                } else {
                  if (column.isAllowed) {
                    opacity = 0.1
                    color = MALL_SPACE_ITEM_COLOR_ALLOWED
                  }
                }

                return (
                  <group
                    key={columnIndex}
                    position={[
                      columnIndex * MALL_SPACE_ITEM_SIZE,
                      0,
                      rowIndex * MALL_SPACE_ITEM_SIZE,
                    ]}
                    onClick={() => {
                      if (column.isAllowed) {
                        onItemClick?.({
                          x: columnIndex,
                          y: rowIndex,
                          floor: floorIndex,
                        })
                      }
                    }}
                  >
                    <mesh>
                      <boxGeometry
                        args={[
                          MALL_SPACE_ITEM_SIZE * 0.9,
                          0.01,
                          MALL_SPACE_ITEM_SIZE * 0.9,
                        ]}
                      />
                      <meshStandardMaterial
                        color={color}
                        transparent={true}
                        opacity={opacity}
                      />
                    </mesh>
                  </group>
                )
              })}
            </group>
          ))}
        </group>
      ))}
    </group>
  )
}
