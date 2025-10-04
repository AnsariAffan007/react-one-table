import type { ColumnDef, ColumnResizeMode } from "@tanstack/react-table";

export interface TableTypes<TData> {
  data: TData[],
  columns: ColumnDef<TData>[],
  resizing?: {
    mode: ColumnResizeMode
  },
  columnPinning?: {
    left?: string[],
    right?: string[]
  }
}