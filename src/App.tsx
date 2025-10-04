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
    columnHelper.accessor("id", {
      id: "id",
      header: "Id"
    }),
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
    columnHelper.accessor("username", {
      header: "Username"
    }),
    columnHelper.accessor("email", {
      header: "Email"
    }),
    columnHelper.accessor("phone", {
      header: "Phone Number"
    }),
    columnHelper.accessor("gender", {
      header: "Gender"
    }),
    columnHelper.accessor("age", {
      header: "Age"
    }),
    columnHelper.accessor("birthDate", {
      header: "Birth Date"
    }),
    columnHelper.accessor("bloodGroup", {
      header: "Blood Group"
    }),
    columnHelper.accessor("height", {
      header: "Height"
    }),
    columnHelper.accessor("weight", {
      header: "Weight"
    }),
    columnHelper.accessor("eyeColor", {
      header: "Eye Color"
    }),
    columnHelper.accessor("hair.color", {
      header: "Hair Color"
    }),
    columnHelper.accessor("hair.type", {
      header: "Hair Type"
    }),
    columnHelper.accessor("role", {
      header: "Role"
    })
  ], [columnHelper])

  return (
    <Table
      columns={columns}
      data={rows}
      resizing={{ mode: "onChange" }}
      columnPinning={{
        left: ["id"]
      }}
    />
  )
}

export default App