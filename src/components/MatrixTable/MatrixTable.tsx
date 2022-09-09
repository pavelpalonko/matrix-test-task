import React, { useState, useMemo, useCallback } from "react"
import MatrixTableDisplayer from "../MatrixTableDisplayer/MatrixTableDisplayer"
import { useMatrixCalculations } from "../../common/hooks/useMatrixCalculations"
import { useMatrixVisualEffects } from "../../common/hooks/useMatrixVisualEffects"
import { uniqueId } from "../../common/utils/uniqueId"
import { randomInteger } from "../../common/utils/randomNumberGenerator"
import MyButton from "../MyButton/MyButton"
import { ClosestCells, CurrentCells, InitialParameters, Matrix, MatrixCell, MatrixRow } from "../../models/matrix.models"

interface MatrixTableProps {
  matrixSize: InitialParameters
  resizeMatrix: (newValue: number) => void
}

const MatrixTable = ({ matrixSize, resizeMatrix }: MatrixTableProps) => {

  const { cellsAmount } = useMatrixVisualEffects()
  const { buildMatrix, addRowMatrix, calculateMatrix } = useMatrixCalculations()

  const [matrix, setMatrix] = useState<Matrix>([])
  const [closestCells, setClosestCells] = useState<ClosestCells>([])

  const matrixSum = useMemo(() => calculateMatrix(matrix), [matrix, calculateMatrix])

  const startBuildMatrix = () => {
    uniqueId(true)
    setMatrix(buildMatrix(matrixSize.M, matrixSize.N, randomInteger, uniqueId))
  }

  const addRow = () => {
    if (matrixSize.M < matrixSize.N) return
    setMatrix([...matrix, ...addRowMatrix(matrix, matrixSize.N, randomInteger, uniqueId)])
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