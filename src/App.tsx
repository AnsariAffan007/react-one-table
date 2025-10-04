import { useEffect, useMemo, useState } from "react"
import type { User } from "./types"
import { createColumnHelper } from "@tanstack/react-table"
import Table from "./components/Table"

const App = () => {

  const [rows, setRows] = useState<User[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://dummyjson.com/users")
        const data = await res.json()
        setRows(data.users)
      }
      catch (e: unknown) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const columnHelper = createColumnHelper<User>()
  const columns = useMemo(() => [
    columnHelper.accessor("firstName", {
      header: ({ header }) => (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'stretch' }}>
          <p>First Name</p>
          <div onMouseDown={header.getResizeHandler()} style={{ width: "10px", backgroundColor: "darkblue" }}></div>
        </div>
      ),
      minSize: 100,
      maxSize: 300
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name"
    }),
    columnHelper.accessor("address.country", {
      header: "Country"
    })
  ], [columnHelper])

  return (
    <Table
      columns={columns}
      data={rows}
      resizing={{ mode: "onChange" }}
    />
  )
}

export default App