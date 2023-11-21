import {FC, PropsWithChildren} from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import {getColorLevelByValue, getGridItemId} from "../../utils.ts";
import {isNull} from "../../../../shared/utils.ts";

type Props = PropsWithChildren<{
  item: { value: number | null }
  col: number
  row: number
  className?: string
}>
export const GridItem: FC<Props> = ({ col, row, item, className, children }) => {
  const id = getGridItemId({ col, row })
    const classNameColor = !isNull(item.value)
      ? styles[`gridItemColor${getColorLevelByValue(item.value)}`]
      : '';

  return (
    <div
      className={cn(
        className,
        classNameColor,
        styles.gridItem,
        styles[`gridItemPosition${id}`],
      )}
    >
      {children}
    </div>
  )
}
