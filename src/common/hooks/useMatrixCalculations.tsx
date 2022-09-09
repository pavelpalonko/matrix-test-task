import { useCallback } from "react"
import { Matrix, MatrixDerivedProperties } from "../../models/matrix.models"

export function useMatrixCalculations() {

  const buildMatrix = (
    rowMatrix: number,
    colMatrix: number,
    randomInt: (min: number, max: number) => number,
    generetorId: (reset: boolean) => number) => {

    return Array.from({ length: rowMatrix },
      (_, k) => (Array.from({ length: colMatrix },
        () => ({ id: generetorId(false), amount: randomInt(100, 999), rowId: k }))))
  }

  const addRowMatrix = (
    matrix: any,
    colMatrix: number,
    randomInt: (min: number, max: number) => number,
    generetorId: (reset: boolean) => number) => {

    const incRowId = matrix[matrix.length - 1][0].rowId + 1

    return Array.from({ length: 1 }, () => (Array.from({ length: colMatrix },
      () => ({ id: generetorId(false), amount: randomInt(100, 999), rowId: incRowId }))))
  }

  const calculateMatrix = useCallback((matrix: Matrix) => {
    const matrixSum: MatrixDerivedProperties = { rowSumValues: [], columnAverageValues: [] }

    matrixSum.rowSumValues = matrix.reduce((sum, row, index) => {
      sum[index].rowSum = row.reduce((ac, cell) => ac + cell.amount, 0)
      sum[index].sumId = matrix[index][0].rowId
      return sum
    }, Array.from({ length: matrix.length }, () => ({ rowSum: 0, sumId: 0 })))

    matrixSum.columnAverageValues = matrix[0]?.reduce((sum, _, index) => {
      sum[index].average = Math.round(matrix.reduce((ac, _, i) => ac + matrix[i][index].amount, 0) / matrix.length)
      return sum
    }, Array.from({ length: matrix[0]?.length }, (_, k) => ({ average: 0, averageId: k })))

    return matrixSum
  }, [])

  return {
    buildMatrix,
    addRowMatrix,
    calculateMatrix
  }
}