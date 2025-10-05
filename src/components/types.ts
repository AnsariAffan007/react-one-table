import type { ColumnDef, ColumnResizeMode } from "@tanstack/react-table";

export interface TableTypes<TData> {
  data: TData[],
  columns: ColumnDef<TData>[],
  resizing?: {
    mode: ColumnResizeMode
  },
  columnPinning?: {
    initialValue: {
      left?: string[],
      right?: string[]
    },
    state?: {
      left?: string[],
      right?: string[]
    }
  }
}