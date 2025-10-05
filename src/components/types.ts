import type { Cell, ColumnDef, ColumnResizeMode, Header, HeaderGroup, Row } from "@tanstack/react-table";

interface TableComponents {
  Table?: React.ComponentType<React.ComponentProps<'table'>>;
  TableHead?: React.ComponentType<React.ComponentProps<'thead'>>;
  TableBody?: React.ComponentType<React.ComponentProps<'tbody'>>;
  TableRow?: React.ComponentType<React.ComponentProps<'tr'>>;
  TableHeaderCell?: React.ComponentType<React.ComponentProps<'th'>>;
  TableBodyCell?: React.ComponentType<React.ComponentProps<'td'>>;
}

interface TableComponentProps<TData> {
  table?: React.ComponentProps<"table">
  tableHead?: React.ComponentProps<"thead">
  tableBody?: React.ComponentProps<"tbody">
  tableHeaderRow?: ({ headerGroup }: { headerGroup: HeaderGroup<TData> }) => React.ComponentProps<"tr">
  tableBodyRow?: ({ row }: { row: Row<TData> }) => React.ComponentProps<"tr">
  tableHeaderCell?: ({ header }: { header: Header<TData, unknown> }) => React.ComponentProps<"th">
  tableBodyCell?: ({ cell }: { cell: Cell<TData, unknown> }) => React.ComponentProps<"td">
}

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
  },
  components?: TableComponents,
  componentProps?: TableComponentProps<TData>,
}