export const isNull = (val: any): val is null => val === null

export const cloneDeep = <T>(data: T): T => JSON.parse(JSON.stringify(data))

export const isEqualObjects = (obj1: Record<string, any>, obj2: Record<string, any>) => (
  JSON.stringify(obj1) === JSON.stringify(obj2)
)
