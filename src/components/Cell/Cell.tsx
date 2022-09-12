import React, { memo } from 'react'
import style from './Cell.module.css'
import { MatrixCell } from '../../models/matrix.models'

interface CellProps {
  cell: MatrixCell
  incAmount: (elemntId: MatrixCell['id']) => void
  highlightCells: (currentCell: MatrixCell) => void
  removeHighlightCells: () => void
  isHighLight: boolean
  percent: string
}

const Cell = memo(({ cell, incAmount, highlightCells, removeHighlightCells, isHighLight, percent }: CellProps) => {

  return (
    <div
      className={isHighLight ? style.cellBackLight : style.cell}
      onClick={() => incAmount(cell.id)}
      onMouseOver={() => highlightCells(cell)}
      onMouseOut={() => removeHighlightCells()}>
      {
        <div 
        className={style.percent}
        style={{width: percent}}
        >
        </div>
      }
      {percent === '0' ? cell.amount : percent}
    </div>
  )
})

export default Cell 