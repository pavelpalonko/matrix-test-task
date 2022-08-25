import React, { useState, useEffect } from "react"
import MatrixTableDisplayer from "../MatrixTableDisplayer/MatrixTableDisplayer"
import { useMatrixCalculations } from "../../common/hooks/useMatrixCalculations"
import { useMatrixVisualEffects} from "../../common/hooks/useMatrixVisualEffects"
import { uniqueId } from "../../common/utils/uniqueId"
import { randomInteger } from "../../common/utils/randomNumberGenerator"
import MyButton from "../MyButton/MyButton"
import { InitialParameters, Matrix, MatrixCell, MatrixRow, MatrixDerivedProperties } from "../../models/matrix.models"

interface MatrixTableProps {
  matrixSize: InitialParameters
  setMatrixSize: Function
}

const MatrixTable = ({ matrixSize, setMatrixSize }: MatrixTableProps ) => {

  const { cellsAmount } = useMatrixVisualEffects()
  const { buildMatrix, calculateMatrix } = useMatrixCalculations()

  const [matrixSum, setMatrixSum] = useState<MatrixDerivedProperties>({ rowSumValues: [], columnAverageValues: [] })
  const [matrix, setMatrix] = useState<Matrix>([])
  const [closestCells, setClosestCells] = useState<MatrixRow>([])

  const startBuildMatrix = () => {
    uniqueId(true)
    setMatrix([...buildMatrix(matrixSize.M, matrixSize.N, randomInteger, uniqueId)])
  }

  const addRow = () => {
    if (matrixSize.M < matrixSize.N) return
    setMatrix([...matrix, ...buildMatrix(1, matrixSize.N, randomInteger, uniqueId)])
    setMatrixSize({ ...matrixSize, M: matrixSize.M + 1 })
  }

  const deleteRow = (event: React.MouseEvent<HTMLElement>) => {
    const clearArrMatrix = matrix.filter(( _ , index: number) => index !== +(event.target as HTMLElement).dataset.index!)
    setMatrix([...clearArrMatrix])
    setMatrixSize({ ...matrixSize, M: matrixSize.M - 1 })
  }

  const incrementsAmount = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).dataset.control) return

    setMatrix((prevState: Matrix) => {
      return prevState.map((rowMatrix: MatrixRow) => {
        return rowMatrix.map((element: MatrixCell) => {
          if (element.id === +(event.target as HTMLElement).dataset.id!) {
            return { ...element, amount: ++element.amount }
          }
          return element
        })
      })
    })
  }

  const onHighlightCells = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).dataset.id) {
      setClosestCells([...cellsAmount(event, matrix, matrixSize.X)])
    }
  }

  useEffect(() => {
    setMatrixSum(calculateMatrix(matrixSize.M, matrixSize.N, matrix))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matrix])

  return (
    <>
        <MyButton inner={'START BUILD MATRIX'} onClick={startBuildMatrix} />
        <MatrixTableDisplayer
          matrix={matrix}
          closestCells={closestCells}
          rowSum={matrixSum.rowSumValues}
          matrixColumnMid={matrixSum.columnAverageValues}
          deleteRow={deleteRow}
          onMouseOutEvent={onHighlightCells}
          onMouseOverEvent={onHighlightCells}
          onClickEvent={incrementsAmount} />
        {
          matrix.length
            ? <MyButton inner={'ADD ROW'} onClick={addRow} />
            : null
        }
    </>
  )
}

export default MatrixTable