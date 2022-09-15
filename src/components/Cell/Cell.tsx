import React, { memo } from 'react'
import { MatrixCell } from '../../models/matrix.models'

interface CellProps {
  cell: MatrixCell
  incAmount: (elemntId: MatrixCell['id']) => void
  highlightCells: (currentCell: MatrixCell) => void
  removeHighlightCells: () => void
  isHighLight: string
  percent: string
}

const Cell = memo(({ cell, incAmount, highlightCells, removeHighlightCells, isHighLight, percent }: CellProps) => {

  return (
    <div
      className={isHighLight}
      onClick={() => incAmount(cell.id)}
      onMouseOver={() => highlightCells(cell)}
      onMouseOut={() => removeHighlightCells()}>
      {percent === '0' ? cell.amount :  percent }
    </div>
  )
})

export default Cell