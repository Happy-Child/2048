import { sample } from 'effector'
import {
  $board,
  $direction,
  AppGate,
  getRandomBoardFx,
  onDirectionEvent,
  runGenerateRandomBoardEvent
} from "./index.ts";
import {Direction} from "../constants.ts";
import {Board} from "../types.ts";
import {combineBoardValues, matrixTranspose, pushBoardToRight, rotateBoardByY} from './utils.ts';

sample({
  clock: AppGate.open,
  target: runGenerateRandomBoardEvent,
})

sample({
  clock: runGenerateRandomBoardEvent,
  target: getRandomBoardFx,
})

sample({
  clock: getRandomBoardFx.doneData,
  target: $board,
})

sample({
  source: { board: $board, direction: $direction },
  clock: onDirectionEvent,
  fn: ({ board, direction }) => {
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
  target: $board,
})

