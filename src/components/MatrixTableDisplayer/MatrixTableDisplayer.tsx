import { useState } from 'react'
import style from './MatrixTableDisplayer.module.css'
import { CellAverage, ClosestCells, CurrentCells, CurrentSumCell, Matrix, MatrixCell, RowSum } from "../../models/matrix.models"

interface MatrixTableDisplayProps {
  matrix: Matrix
  closestCells: ClosestCells
  removeHighlightsCells: () => void
  deleteRow: (rowIndex: number) => void
  highlightCells: (currentCell: CurrentCells) => void
  incrementsAmount: (elemntId: MatrixCell['id']) => void
  rowSum: RowSum[]
  columnAverage: CellAverage[]
}

const MatrixTableDisplayer = ({ matrix, closestCells, removeHighlightsCells, deleteRow, highlightCells, incrementsAmount, rowSum, columnAverage }: MatrixTableDisplayProps) => {

  const flatMatrix = matrix.flat()
  const [currentSumCell, setCurrentSumCell] = useState<CurrentSumCell>({sumId: -1, index: -1})

  const showPercente = (currentCell: CurrentSumCell) => {
    setCurrentSumCell(currentCell)
  }

  const isClosestCells = (currentId: number) => {
    if (closestCells.length === 0) return false
    for (let cell of closestCells) {
      if (cell.id === currentId) return true
    }
  }

  return (
    <div>

      <div className={style.container}>
        <div>
          {
            matrix.map((row, index: number) => (
              <div key={`delete_id${row[0].rowId}`} onClick={() => deleteRow(index)} className={style.deleteBtn}>✖</div>
            ))
          }
        </div>

        <div className={style.cellWrapp} style={{ gridTemplateColumns: `repeat(${columnAverage?.length}, 1fr)` }}>
          {
            flatMatrix.map((cell: MatrixCell) => (
              <div
                key={`cell_Id${cell.id}`}
                onClick={() => incrementsAmount(cell.id)}
                onMouseOver={() => highlightCells(cell)}
                onMouseOut={() => removeHighlightsCells()}
                className={isClosestCells(cell.id) ? style.cellBackLight : style.cell}>
                {<div
                  className={style.percent}
                  style={{ width: currentSumCell.sumId === cell.rowId ? `${Math.round((cell.amount / rowSum[currentSumCell.index].rowSum) * 100)}%` : '0' }}>
                </div>}
                {currentSumCell.sumId === cell.rowId ? `${Math.round((cell.amount /rowSum[currentSumCell.index].rowSum) * 100)}%` : cell.amount}
              </div>
            ))
          }
        </div>

        <div>
          {
            rowSum.map((sum, index) => (
              <div
                key={`rowSum_id${sum.sumId}`}
                onMouseOver={() => showPercente({sumId: sum.sumId, index: index})}
                onMouseOut={() => setCurrentSumCell({sumId: -1, index: -1})}
                className={style.sum}>{sum.rowSum}</div>
            ))
          }
        </div>

      </div>

      <div className={style.averageWrapp}>
        {
          columnAverage?.map((elem) => (
            <div key={`average_id${elem.averageId}`} className={style.average}>{elem.average}</div>
          ))
        }
      </div>

    </div>
  )
}

export default MatrixTableDisplayer