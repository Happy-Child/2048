import {MaxColorLevel} from "./constants.ts";

export const getGridItemId = ({ row, col }: { row: number, col: number }): string => `${row}${col}`

export const getColorLevelByValue = (value: number): number => {
  const num = Math.log2(value) - 1;

  if (num === 0 || num === 1) {
    return 1
  }

  if (num > MaxColorLevel) {
    return MaxColorLevel
  }

  return num
}
