import type { Table } from "@tanstack/react-table";

export const getColumnsOffsetMap = <TData,>(table: Table<TData>, pinDirection: "left" | "right") => {
  const pinnedColumns = table.getAllColumns().filter(column => column.getIsPinned() === pinDirection)
  if (pinDirection === "right") pinnedColumns.reverse()
  const columnOffsetMap: Record<string, { width: number, offset: number }> = {}
  pinnedColumns.forEach(column => {
    let sumOfAllPreviousValues = 0
    Object.values(columnOffsetMap).forEach(val => sumOfAllPreviousValues += val.width)
    columnOffsetMap[column.id] = { offset: sumOfAllPreviousValues, width: column.getSize() }
  })
  return columnOffsetMap
}