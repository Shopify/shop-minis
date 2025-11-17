import * as THREE from 'three'
import {CAMERA_DISTANCE_FROM_FLOOR} from './camera'

export type MallLocationType = {
  x: number
  y: number
  floor: number
}

export type MallSpaceItem = MallLocationType & {
  isAllowed: boolean
}

export type MallSpaceRowType = Array<MallSpaceItem>

export type MallSpaceFloorType = Array<MallSpaceRowType>

export type MallSpaceType = Array<MallSpaceFloorType>

const MALL_FLOOR_1 = [
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', 'X', ' ', 'X', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', 'X', ' ', 'X', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', 'X', ' ', 'X', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' '],
  [' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', 'X', ' ', 'X', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', 'X', ' ', 'X', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', 'X', ' ', 'X', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', 'X', ' ', 'X', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' '],
  [' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
]

const MALL_FLOORS = [MALL_FLOOR_1]

export const createMall = (): MallSpaceType => {
  return Array.from({length: MALL_FLOORS.length}, (_, floor) =>
    Array.from({length: MALL_FLOOR_ROWS_COUNT}, (_, row) =>
      Array.from({length: MALL_FLOOR_COLUMNS_COUNT}, (_, column) => ({
        x: column,
        y: row,
        floor,
        isAllowed: MALL_FLOORS[floor][row][column] === 'X',
      }))
    )
  )
}

export const getPositionFromLocation = (location: MallLocationType) => {
  const positionRelativeToMall = new THREE.Vector3(
    location.x * MALL_SPACE_ITEM_SIZE,
    location.floor * MALL_FLOOR_HEIGHT + CAMERA_DISTANCE_FROM_FLOOR,
    location.y * MALL_SPACE_ITEM_SIZE
  )

  const absolutePosition = positionRelativeToMall.clone().add(MALL_POSITION)

  return absolutePosition
}

export const MALL_FLOOR_ROWS_COUNT = MALL_FLOOR_1.length
export const MALL_FLOOR_COLUMNS_COUNT = MALL_FLOOR_1[0].length
export const MALL_FLOOR_OFFSET = 0.1
export const MALL_FLOOR_HEIGHT = 5
export const MALL_SPACE_ITEM_SIZE = 0.98
export const MALL_POSITION = new THREE.Vector3(-5, MALL_FLOOR_OFFSET, -18)
export const INITIAL_PLAYER_LOCATION: MallLocationType = {
  x: 9,
  y: 24,
  floor: 0,
}
export const INITIAL_PLAYER_POSITION: THREE.Vector3 = getPositionFromLocation(
  INITIAL_PLAYER_LOCATION
)
