import type { ColumnDef, ColumnResizeMode } from "@tanstack/react-table";

export interface TableTypes<TData> {
  data: TData[],
  columns: ColumnDef<TData, string>[],
  resizing?: {
    mode: ColumnResizeMode
  }
}