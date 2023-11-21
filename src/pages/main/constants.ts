import {GridItem} from "./types.ts";

export const BoardSize = 4

export const MaxColorLevel = 12

export const InitialBoardValue = 2

export const SkeletonGridItems: GridItem[][] = (new Array(BoardSize).fill(0).map(() => {
  return new Array(BoardSize).fill(0).map(() => ({ value: null }))
}))

export const EmptyBoard = (new Array(BoardSize).fill(0).map(() => {
  return new Array(BoardSize).fill(0).map(() => ({ value: null }))
}))

export enum Direction {
  Left = 'Left',
  Right = 'Right',
  Top = 'Top',
  Bottom = 'Bottom'
}

export enum KeyCodes {
  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',
  ButtonA = 'a',
  ButtonW = 'w',
  ButtonD = 'd',
  ButtonS = 's',
}

export const DirectionByKeyCode = {
  [KeyCodes.ArrowUp]: Direction.Top,
  [KeyCodes.ArrowLeft]: Direction.Left,
  [KeyCodes.ArrowRight]: Direction.Right,
  [KeyCodes.ArrowDown]: Direction.Bottom,
  [KeyCodes.ButtonW]: Direction.Top,
  [KeyCodes.ButtonA]: Direction.Left,
  [KeyCodes.ButtonD]: Direction.Right,
  [KeyCodes.ButtonS]: Direction.Bottom,
}
