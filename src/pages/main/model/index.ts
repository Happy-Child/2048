import {createEvent, createStore, restore} from 'effector'
import {GridItem} from "../types.ts";
import {Direction} from "../constants.ts";

export const onDirectionEvent = createEvent<Direction>('onDirectionEvent')

export const $direction = restore(onDirectionEvent, Direction.Left)

export const $items = createStore<GridItem[][]>([
  [
    {
      value: 2
    },
    {
      value: 2**12
    },
    {
      value: 2**16
    },
    {
      value: null
    },
  ],
  [
    {
      value: 2**2
    },
    {
      value: 2**13
    },
    {
      value: null
    },
    {
      value: null
    },
  ],
  [
    {
      value: 2**3
    },
    {
      value: 2**14
    },
    {
      value: null
    },
    {
      value: null
    },
  ],
  [
    {
      value: 2**8
    },
    {
      value: null
    },
    {
      value: null
    },
    {
      value: null
    },
  ],
])


