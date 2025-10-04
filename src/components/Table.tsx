import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import type { TableTypes } from "./types"

const Table = <TData,>({
  data,
  columns,
  resizing
}: TableTypes<TData>) => {

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: resizing?.mode
  })

  return (
    <div>
      <table>

        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={{ width: header.getSize() }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default Table