import React, { useState, useMemo } from "react"
import MatrixTableDisplayer from "../MatrixTableDisplayer/MatrixTableDisplayer"
import { useMatrixCalculations } from "../../common/hooks/useMatrixCalculations"
import { useMatrixVisualEffects } from "../../common/hooks/useMatrixVisualEffects"
import { uniqueId } from "../../common/utils/uniqueId"
import { randomInteger } from "../../common/utils/randomNumberGenerator"
import MyButton from "../MyButton/MyButton"
import { InitialParameters, Matrix, MatrixCell, MatrixRow } from "../../models/matrix.models"

interface MatrixTableProps {
  matrixSize: InitialParameters
  setMatrixSize: Function
}

const MatrixTable = ({ matrixSize, setMatrixSize }: MatrixTableProps) => {

  const { cellsAmount } = useMatrixVisualEffects()
  const { buildMatrix, calculateMatrix } = useMatrixCalculations()

  const [matrix, setMatrix] = useState<Matrix>([])
  const [closestCells, setClosestCells] = useState<MatrixRow>([])

  
  const matrixSum = useMemo(() => calculateMatrix(matrixSize.M, matrixSize.N, matrix), [matrixSize.M, matrixSize.N, matrix, calculateMatrix])

  const startBuildMatrix = () => {
    uniqueId(true)
    setMatrix([...buildMatrix(matrixSize.M, matrixSize.N, randomInteger, uniqueId)])
  }

  const addRow = () => {
    if (matrixSize.M < matrixSize.N) return
    setMatrix([...matrix, ...buildMatrix(1, matrixSize.N, randomInteger, uniqueId)])
    setMatrixSize({ ...matrixSize, M: matrixSize.M + 1 })
  }

  const deleteRow = (rowIndex: number) => {
    const clearArrMatrix = matrix.filter((_, index: number) => index !== rowIndex)
    setMatrix(clearArrMatrix)
    setMatrixSize({ ...matrixSize, M: matrixSize.M - 1 })
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

  const onHighlightCells = (currentCell: MatrixCell) => {
    setClosestCells([...cellsAmount(currentCell, matrix, matrixSize.X)])
  }

  return (
    <>
      <MyButton inner={'START BUILD MATRIX'} onClick={startBuildMatrix} />
      <MatrixTableDisplayer
        matrix={matrix}
        closestCells={closestCells}
        rowSum={matrixSum.rowSumValues}
        matrixColumnMid={matrixSum.columnAverageValues}
        deleteRow={deleteRow}
        removeHighlightsCells={onHighlightCells}
        highlightCells={onHighlightCells}
        incrementsAmount={incrementsAmount} />
      {
        matrix.length
          ? <MyButton inner={'ADD ROW'} onClick={addRow} />
          : null
      }
    </>
  )
}

export default MatrixTable