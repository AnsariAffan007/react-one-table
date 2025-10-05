import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import type { TableTypes } from "./types"
import { useMemo } from "react"
import { getColumnsOffsetMap } from "../utils/columnPin"

const Table = <TData,>({
  data,
  columns,
  resizing,
  columnPinning
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

  return (
    <div style={{ maxWidth: "100%", overflow: 'auto', position: "relative" }}>
      <table style={{ minWidth: "max-content" }}>

        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const isPinnedColumn = header.column.getIsPinned()
                return (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      position: isPinnedColumn ? "sticky" : "static",
                      left: isPinnedColumn === "left" ? columnOffsetMapLeft[header.column.id].offset : undefined,
                      right: isPinnedColumn === "right" ? columnOffsetMapRight[header.column.id].offset : undefined,
                      zIndex: 2,
                      backgroundColor: "black"
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => {
                const isPinnedColumn = cell.column.getIsPinned()
                return (
                  <td
                    key={cell.id}
                    style={{
                      position: isPinnedColumn ? "sticky" : "static",
                      left: isPinnedColumn === "left" ? columnOffsetMapLeft[cell.column.id].offset : undefined,
                      right: isPinnedColumn === "right" ? columnOffsetMapRight[cell.column.id].offset : undefined,
                      zIndex: 2,
                      backgroundColor: "black"
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default Table