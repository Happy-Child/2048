import {cloneDeep, isNull} from "../../../shared/utils.ts";
import {Board} from "../types.ts";

export const rotateBoardByY = (board: Board): Board => board.map((row) => row.reverse())

export const matrixTranspose = <T extends Array<Array<any>>>(mtrx: T): T => {
  mtrx = cloneDeep(mtrx)

  const newMtrx = (new Array(mtrx.length).fill(0).map(() => [])) as unknown as T

  mtrx.forEach((row, parentIndex) => {
    row.forEach((item, index) => {
      newMtrx[index][parentIndex] = item
    })
  })

  return newMtrx
}

export const combineBoardValues = (board: Board): Board => {
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

export const pushBoardToRight = (board: Board): Board => {
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

const getRandomNumber = (value: number) => (
  Math.floor(Math.random() * value)
)

export const generateRandomBoardPosition = (boardSize: number): { row: number, col: number } => ({
  row: getRandomNumber(boardSize),
  col: getRandomNumber(boardSize),
})
