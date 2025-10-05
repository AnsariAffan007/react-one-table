import type { Table } from "@tanstack/react-table";

export const getColumnsOffsetMap = <TData,>(table: Table<TData>, pinPosition: "left" | "right") => {
  const pinnedColumns = table.getAllColumns().filter(column => column.getIsPinned() === pinPosition)
  if (pinPosition === "right") pinnedColumns.reverse()
  const columnOffsetMap: Record<string, { width: number, offset: number }> = {}
  let sum = 0;
  pinnedColumns.forEach(column => {
    columnOffsetMap[column.id] = { offset: sum, width: column.getSize() };
    sum += column.getSize();
  });
  return columnOffsetMap
}