import styles from './styles.module.scss'
import cn from 'classnames'
import {useUnit} from "effector-react";
import {$items, onDirectionEvent} from "./model";
import {GridItem} from "./components";
import {DirectionByKeyCode, KeyCodes, SkeletonGridItems} from "./constants.ts";
import {useEffect} from "react";

const Main = () => {
  const items = useUnit($items)

  useEffect(() => {
    const handler = ({ key }: KeyboardEvent) => {
      if (key in DirectionByKeyCode) {
        onDirectionEvent(DirectionByKeyCode[key as KeyCodes])
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, []);

  return (
    <main className={styles.root}>
        <div className={styles.content}>

          <div className={styles.board}>
            <div className={styles.grid}>
              {SkeletonGridItems.map((items, parentIndex) =>
                items.map((item, index) => (
                  <GridItem
                    key={String(parentIndex) + String(index)}
                    row={parentIndex + 1}
                    col={index + 1}
                    item={item}
                    className={styles.gridItemSkeleton}
                  />
                ))
              )}
            </div>
            <div className={cn(styles.grid)}>
              {items.map((board, parentIndex) => (
                board.map((item, index) => (
                  <GridItem
                    key={String(parentIndex) + String(index)}
                    row={parentIndex + 1}
                    col={index + 1}
                    item={item}
                  >
                    <div className={styles.gridItemValue}>
                      {item.value}
                    </div>
                  </GridItem>
                ))
              ))}
            </div>
          </div>
        </div>
    </main>
  )
}

export { Main }
