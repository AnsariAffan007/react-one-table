import type { ColumnPinningState } from "@tanstack/react-table"
import { useCallback, useState } from "react"

const useColumnPin = () => {

  const [columnPins, setColumnPins] = useState<ColumnPinningState>({})

  const pinColumn = useCallback((columnId: string, position: "left" | "right") => {
    setColumnPins(prev => {
      const current = prev[position] || []
      if (current.includes(columnId)) return prev;
      return { ...prev, [position]: [...current, columnId] }
    })
  }, [])

  const unPinColumn = useCallback((columnId: string, position: "left" | "right") => {
    setColumnPins(prev => {
      const current = prev[position] || []
      if (!current.includes(columnId)) return prev;
      return { ...prev, [position]: current.filter(id => id !== columnId) }
    })
  }, [])

  return {
    columnPins,
    pinColumn,
    unPinColumn
  }
}

export default useColumnPin