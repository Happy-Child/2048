import { sample } from 'effector'
import {$direction, $items, onDirectionEvent} from "./index.ts";
import {GridItem} from "../types.ts";
import {cloneDeep, isNull} from "../../../shared/utils.ts";
import {Direction} from "../constants.ts";

type Board = GridItem[][]

const rotateBoardByY = (board: Board): Board => board.map((row) => row.reverse())

const matrixTranspose = <T extends Array<Array<any>>>(mtrx: T): T => {
  mtrx = cloneDeep(mtrx)

  const newMtrx = (new Array(mtrx.length).fill(0).map(() => [])) as unknown as T

  mtrx.forEach((row, parentIndex) => {
    row.forEach((item, index) => {
      newMtrx[index][parentIndex] = item
    })
  })

  return newMtrx
}

const pushBoardToRight = (board: Board): Board => {
  const newBoard = cloneDeep(board)

  newBoard.forEach((row) => {
    let lastIndex = board.length - 1

    for (let i = row.length - 1; i >= 0; i--) {
      const { value } = row[i]

      if (isNull(value)) {
        continue
      }

      if (lastIndex !== i) {
        row[lastIndex] = { value }
        row[i] = { value: null }
      }

      lastIndex--
    }
  })

  return newBoard
}


const pushBoardByDirection = (board: Board, direction: Direction): Board => {
  let newBoard: Board

  if (direction === Direction.Right) {
    newBoard = pushBoardToRight(board)
  } else if (direction === Direction.Left) {
    const rotatedByY = pushBoardToRight(rotateBoardByY(board))
    newBoard = rotateBoardByY(rotatedByY)
  } else if (direction === Direction.Top) {
    const transposeBoard = matrixTranspose(board)
    const rotatedByY = pushBoardToRight(rotateBoardByY(transposeBoard))
    newBoard = matrixTranspose(rotateBoardByY(rotatedByY))
  } else if (direction === Direction.Bottom) {
    const transposeBoard = matrixTranspose(board)
    const rotatedByY = pushBoardToRight(transposeBoard)
    newBoard = matrixTranspose(rotatedByY)
  } else {
    newBoard = board
  }

  return newBoard
}


sample({
  source: { items: $items, direction: $direction },
  clock: onDirectionEvent,
  fn: ({ items: board, direction }) => {
    const newBoard = pushBoardByDirection(board, direction)

    return newBoard
  },
  target: $items,
})

