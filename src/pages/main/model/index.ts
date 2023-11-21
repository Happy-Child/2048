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
      value: 2**5
    },
    {
      value: 2**4
    },
    {
      value: 2
    },
  ],
  [
    {
      value: null
    },
    {
      value: 2
    },
    {
      value: 2**4
    },
    {
      value: 2
    },
  ],
  [
    {
      value: null
    },
    {
      value: null
    },
    {
      value: 2**2
    },
    {
      value: 2**3
    },
  ],
  [
    {
      value: null
    },
    {
      value: null
    },
    {
      value: 2
    },
    {
      value: 2
    },
  ],
])


