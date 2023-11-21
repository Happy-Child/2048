import {attach, createEvent, createStore, restore} from 'effector'
import {GridItem} from "../types.ts";
import {BoardSize, Direction, EmptyBoard, InitialBoardValue} from "../constants.ts";
import {createGate} from "effector-react";
import {generateRandomBoardPosition} from "./utils.ts";
import {isEqualObjects} from "../../../shared/utils.ts";

export const AppGate = createGate('AppGate')

export const runGenerateRandomBoardEvent = createEvent('runGenerateRandomBoardEvent')

export const onDirectionEvent = createEvent<Direction>('onDirectionEvent')

export const $direction = restore(onDirectionEvent, Direction.Left)

export const $board = createStore<GridItem[][]>(EmptyBoard).reset(AppGate.close)

export const getRandomBoardFx = attach({
  effect: (board) => {
    const getStartItems = (): { row: number, col:  number }[] => {
      const first = generateRandomBoardPosition(BoardSize)
      const second = generateRandomBoardPosition(BoardSize)

      if (isEqualObjects(first, second)) {
        return getStartItems()
      }

      return [first, second]
    }

    const [first, second] = getStartItems()

    return board.map((row, rowIndex) => {
      if (![first.row, second.row].includes(rowIndex)) {
        return row
      }

      return row.map((col, colIndex) => {
        const matchWithFirst = first.row === rowIndex && first.col === colIndex
        const matchWithSecond = second.row === rowIndex && second.col === colIndex

        if (matchWithFirst || matchWithSecond) {
          return { value: InitialBoardValue }
        }

        return col
      })
    })
  },
  source: $board,
})
