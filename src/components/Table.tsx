import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import type { TableTypes } from "./types"
import { useMemo } from "react"
import { getColumnsOffsetMap } from "../utils/columnPin"

const Table = <TData,>({
  data,
  columns,
  resizing,
  columnPinning,
  components,
  componentProps
}: TableTypes<TData>) => {

  const table = useReactTable<TData>({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: resizing?.mode,
    initialState: {
      ...columnPinning?.initialValue && {
        columnPinning: {
          left: columnPinning?.initialValue.left,
          right: columnPinning?.initialValue.right
        }
      }
    },
    state: {
      ...columnPinning?.state && {
        columnPinning: {
          left: columnPinning?.state?.left,
          right: columnPinning?.state?.right
        }
      }
    }
  })

  const columnSizes = table.getState().columnSizing

  const columnOffsetMapLeft = useMemo(
    () => getColumnsOffsetMap(table, "left"),
    [table, columnPinning, columnSizes]
  )
  const columnOffsetMapRight = useMemo(
    () => getColumnsOffsetMap(table, "right"),
    [table, columnPinning, columnSizes]
  )

  const Table = components?.Table || "table"
  const TableHead = components?.TableHead || "thead"
  const TableBody = components?.TableBody || "tbody"
  const TableRow = components?.TableRow || "tr"
  const TableHeaderCell = components?.TableHeaderCell || "th"
  const TableBodyCell = components?.TableBodyCell || "td"

  return (
    <div style={{ maxWidth: "100%", overflow: 'auto', position: "relative" }}>
      <Table style={{ minWidth: "max-content" }} {...componentProps?.table}>

        <TableHead {...componentProps?.tableHead}>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} {...componentProps?.tableHeaderRow?.({ headerGroup })}>
              {headerGroup.headers.map(header => {
                const isPinnedColumn = header.column.getIsPinned()
                return (
                  <TableHeaderCell
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      position: isPinnedColumn ? "sticky" : "static",
                      left: isPinnedColumn === "left" ? columnOffsetMapLeft[header.column.id].offset : undefined,
                      right: isPinnedColumn === "right" ? columnOffsetMapRight[header.column.id].offset : undefined,
                      zIndex: 2,
                      backgroundColor: "black"
                    }}
                    {...componentProps?.tableHeaderCell?.({ header })}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHeaderCell>
                )
              })}
            </TableRow>
          ))}
        </TableHead>

        <TableBody {...componentProps?.tableBody}>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id} {...componentProps?.tableBodyRow?.({ row })}>
              {row.getVisibleCells().map(cell => {
                const isPinnedColumn = cell.column.getIsPinned()
                return (
                  <TableBodyCell
                    key={cell.id}
                    style={{
                      position: isPinnedColumn ? "sticky" : "static",
                      left: isPinnedColumn === "left" ? columnOffsetMapLeft[cell.column.id].offset : undefined,
                      right: isPinnedColumn === "right" ? columnOffsetMapRight[cell.column.id].offset : undefined,
                      zIndex: 2,
                      backgroundColor: "black"
                    }}
                    {...componentProps?.tableBodyCell?.({ cell })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableBodyCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  )
}

export default Table