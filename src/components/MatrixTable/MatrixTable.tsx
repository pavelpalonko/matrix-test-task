import React, { useState, useCallback, useEffect } from "react"
import MatrixTableDisplayer from "../MatrixTableDisplayer/MatrixTableDisplayer"
import { useMatrixCalculations } from "../../common/hooks/useMatrixCalculations"
import { useMatrixVisualEffects } from "../../common/hooks/useMatrixVisualEffects"
import { uniqueId } from "../../common/utils/uniqueId"
import MyButton from "../MyButton/MyButton"
import { InitialParameters, Matrix, MatrixCell, MatrixRow } from "../../models/matrix.models"

interface MatrixTableProps {
  matrixSize: InitialParameters
}

const MatrixTable = ({ matrixSize }: MatrixTableProps) => {

  const [matrix, setMatrix] = useState<Matrix>([])
  const [currentCell, setCurrentCell] = useState<MatrixCell>({amount: 0, id: 0, rowId: 0})

  const { cellsAmount } = useMatrixVisualEffects(currentCell, matrix, matrixSize.X)
  const { createMatrix, matrixSum } = useMatrixCalculations(matrix)

  const addRow = () => {
    if (matrixSize.M < matrixSize.N) return
    setMatrix([...matrix, ...createMatrix(1, matrixSize.N, matrix[matrix.length - 1][0].rowId + 1)])
  }

  const deleteRow = (rowIndex: number) => {
    const clearArrMatrix = matrix.filter((_, index: number) => index !== rowIndex)
    setMatrix(clearArrMatrix)
  }

  const incrementsAmount = useCallback( (elementId: MatrixCell['id']) => {
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
  }, [])

  const onHighlightCells = useCallback(
    (currentCell: MatrixCell) => {
      setCurrentCell(currentCell)
    }, [setCurrentCell]
  )

  const removeHighlightCells = useCallback(() => setCurrentCell({amount: 0, id: 0, rowId: 0}), [setCurrentCell])

  useEffect( () => {
    uniqueId(true)
    setMatrix(createMatrix(matrixSize.M, matrixSize.N))
  },[createMatrix, matrixSize.M, matrixSize.N])

  return (
    <>
    <button onClick={() => (window.location.href = '/')} >✎</button>
    <div>M:{matrixSize.M} N:{matrixSize.N} X:{matrixSize.X}</div>
      <MatrixTableDisplayer
        matrix={matrix}
        closestCells={cellsAmount}
        rowSum={matrixSum.rowSumValues}
        columnAverage={matrixSum.columnAverageValues}
        deleteRow={deleteRow}
        onHighlightCells={onHighlightCells}
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