import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import type { TableTypes } from "./types"

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
      columnPinning: {
        left: columnPinning?.left,
        right: columnPinning?.right
      }
    }
  })

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
                      left: 0,
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
                      left: 0,
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