export const isNull = (val: any): val is null => val === null

export const cloneDeep = <T>(data: T): T => JSON.parse(JSON.stringify(data))
