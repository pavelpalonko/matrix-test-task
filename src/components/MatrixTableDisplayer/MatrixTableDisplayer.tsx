import React from 'react'
import { useState } from 'react'
import style from './MatrixTableDisplayer.module.css'
import { CellAverage, CurrentSumCell, Matrix, MatrixCell, MatrixRow, RowSum } from "../../models/matrix.models"
import Cell from '../Cell/Cell'

interface MatrixTableDisplayProps {
  matrix: Matrix
  closestCells: MatrixRow
  removeHighlightsCells: () => void
  deleteRow: (rowIndex: number) => void
  onHighlightCells: (currentCell: MatrixCell) => void
  incrementsAmount: (elemntId: MatrixCell['id']) => void
  rowSum: RowSum[]
  columnAverage: CellAverage[]
}

const MatrixTableDisplayer = ({ matrix, closestCells, removeHighlightsCells, deleteRow, onHighlightCells, incrementsAmount, rowSum, columnAverage }: MatrixTableDisplayProps) => {

  const flatMatrix = matrix.flat()
  const [currentSumCell, setCurrentSumCell] = useState<CurrentSumCell>({ sumId: -1, index: -1 })

  const showPercent = (currentCell: CurrentSumCell) => {
    setCurrentSumCell(currentCell)
  }

  const isClosestCells = (currentId: number): boolean => {
    if (closestCells.length === 0) return false
    return Boolean(closestCells.find((el) => el.id === currentId))
  }

  const calcPercent = (cell: MatrixCell) => {
    return currentSumCell.sumId === cell.rowId
      ? `${Math.round((cell.amount / rowSum[currentSumCell.index].rowSum) * 100)}%`
      : '0'
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

        <div className={style.cellWrapper} style={{ gridTemplateColumns: `repeat(${columnAverage?.length}, 1fr)` }}>
          {
            flatMatrix.map((cell: MatrixCell) => {
              const cellClass = [style.cell]
              if (isClosestCells(cell.id)) cellClass.push(style.cellBackLight)
              return (
                <Cell
                  key={`cell_Id${cell.id}`}
                  cell={cell}
                  incAmount={incrementsAmount}
                  highlightCells={onHighlightCells}
                  removeHighlightCells={removeHighlightsCells}
                  isHighLight={cellClass.join(' ')}
                  percent={calcPercent(cell)}
                />
              )
            })
          }
        </div>

        <div>
          {
            rowSum.map((sum, index) => (
              <div
                key={`rowSum_id${sum.sumId}`}
                onMouseOver={() => showPercent({ sumId: sum.sumId, index: index })}
                onMouseOut={() => setCurrentSumCell({ sumId: -1, index: -1 })}
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