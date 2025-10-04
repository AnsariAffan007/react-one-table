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

  const pinnedColumnsLeft = table.getAllColumns().filter(column => column.getIsPinned() === "left")
  const pinnedColumnsRight = table.getAllColumns().filter(column => column.getIsPinned() === "right")
  const columnOffsetMapLeft: Record<string, { width: number, offset: number }> = {}
  const columnOffsetMapRight: Record<string, { width: number, offset: number }> = {}
  pinnedColumnsLeft.forEach(column => {
    let sumOfAllPreviousValues = 0
    Object.values(columnOffsetMapLeft).forEach(val => sumOfAllPreviousValues += val.width)
    columnOffsetMapLeft[column.id] = { offset: sumOfAllPreviousValues, width: column.getSize() }
  })
  pinnedColumnsRight.forEach(column => {
    let sumOfAllPreviousValues = 0
    Object.values(columnOffsetMapRight).forEach(val => sumOfAllPreviousValues += val.width)
    columnOffsetMapRight[column.id] = { offset: sumOfAllPreviousValues, width: column.getSize() }
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