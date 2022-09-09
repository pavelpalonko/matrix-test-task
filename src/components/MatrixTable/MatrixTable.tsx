import React, { useState, useCallback } from "react"
import MatrixTableDisplayer from "../MatrixTableDisplayer/MatrixTableDisplayer"
import { useMatrixCalculations } from "../../common/hooks/useMatrixCalculations"
import { useMatrixVisualEffects } from "../../common/hooks/useMatrixVisualEffects"
import { uniqueId } from "../../common/utils/uniqueId"
import MyButton from "../MyButton/MyButton"
import { ClosestCells, CurrentCells, InitialParameters, Matrix, MatrixCell, MatrixRow } from "../../models/matrix.models"

interface MatrixTableProps {
  matrixSize: InitialParameters
  resizeMatrix: (newValue: number) => void
}

const MatrixTable = ({ matrixSize, resizeMatrix }: MatrixTableProps) => {

  const [matrix, setMatrix] = useState<Matrix>([])
  const [closestCells, setClosestCells] = useState<ClosestCells>([])

  const { cellsAmount } = useMatrixVisualEffects()
  const { createMatrix, matrixSum } = useMatrixCalculations(matrix)

  const startBuildMatrix = () => {
    uniqueId(true)
    setMatrix(createMatrix(matrixSize.M, matrixSize.N))
  }

  const addRow = () => {
    if (matrixSize.M < matrixSize.N) return
    setMatrix([...matrix, ...createMatrix(1, matrixSize.N, matrix[matrix.length - 1][0].rowId + 1)])
    resizeMatrix(matrixSize.M + 1)
  }

  const deleteRow = (rowIndex: number) => {
    const clearArrMatrix = matrix.filter((_, index: number) => index !== rowIndex)
    setMatrix(clearArrMatrix)
    resizeMatrix(matrixSize.M - 1)
  }

  const incrementsAmount = (elementId: MatrixCell['id']) => {
    setMatrix((prevState: Matrix) => {
      return prevState.map((rowMatrix: MatrixRow) => {
        return rowMatrix.map((element: MatrixCell) => {
          if (element.id === elementId) {
            return { ...element, amount: ++element.amount }
          }
          return element
        })
      })
    })
  }

  const onHighlightCells = useCallback(
    (currentCell: CurrentCells) => {
      setClosestCells([...cellsAmount(currentCell, matrix, matrixSize.X)])
    }, [cellsAmount, matrix, matrixSize.X]
  )

  const removeHighlightCells = useCallback(() => setClosestCells([]), [setClosestCells])

  return (
    <>
      <MyButton inner={'START BUILD MATRIX'} onClickHandler={startBuildMatrix} />
      <MatrixTableDisplayer
        matrix={matrix}
        closestCells={closestCells}
        rowSum={matrixSum.rowSumValues}
        columnAverage={matrixSum.columnAverageValues}
        deleteRow={deleteRow}
        highlightCells={onHighlightCells}
        removeHighlightsCells={removeHighlightCells}
        incrementsAmount={incrementsAmount} />
      {
        matrix.length
          ? <MyButton inner={'ADD ROW'} onClickHandler={addRow} />
          : null
      }
    </>
  )
}

export default MatrixTable