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

const combineBoardValues = (board: Board): Board => {
  const newBoard = cloneDeep(board)

  newBoard.forEach((row) => {
    for (let i = row.length - 1; i > 0; i--) {
      const curValue = row[i].value
      const prevValue = row[i - 1].value

      if (isNull(curValue) || isNull(prevValue)) {
        continue
      }

      if (curValue === prevValue) {
        row[i].value = (row[i].value as number) * 2
        row[i - 1].value = null
      }
    }
  })

  return newBoard
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

sample({
  source: { items: $items, direction: $direction },
  clock: onDirectionEvent,
  fn: ({ items: board, direction }) => {
    let newBoard: Board

    if (direction === Direction.Right) {
      newBoard = pushBoardToRight(board)
      newBoard = pushBoardToRight(combineBoardValues(newBoard))
    } else if (direction === Direction.Left) {
      let rotatedByY = pushBoardToRight(rotateBoardByY(board))
      rotatedByY = pushBoardToRight(combineBoardValues(rotatedByY))
      newBoard = rotateBoardByY(rotatedByY)
    } else if (direction === Direction.Top) {
      const transposeBoard = matrixTranspose(board)
      let rotatedByY = pushBoardToRight(rotateBoardByY(transposeBoard))
      rotatedByY = pushBoardToRight(combineBoardValues(rotatedByY))
      newBoard = matrixTranspose(rotateBoardByY(rotatedByY))
    } else if (direction === Direction.Bottom) {
      const transposeBoard = matrixTranspose(board)
      let rotatedByY = pushBoardToRight(transposeBoard)
      rotatedByY = pushBoardToRight(combineBoardValues(rotatedByY))
      newBoard = matrixTranspose(rotatedByY)
    } else {
      newBoard = board
    }

    return newBoard
  },
  target: $items,
})

