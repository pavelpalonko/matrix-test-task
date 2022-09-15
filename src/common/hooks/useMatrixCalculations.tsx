import { useMemo } from "react"
import { Matrix, MatrixDerivedProperties } from "../../models/matrix.models"
import { randomInteger } from "../utils/randomNumberGenerator"
import { uniqueId } from "../utils/uniqueId"

export function useMatrixCalculations(matrix: Matrix) {

  const createMatrix = (rowMatrix: number, colMatrix: number, id: number = 0) => {
    return Array.from({ length: rowMatrix }, (_, k) => (Array.from({ length: colMatrix },
      () => ({ id: uniqueId(false), amount: randomInteger(100, 999), rowId: id > 0 ? id : k }))))
  }

  const matrixSum = useMemo(() => {
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
  }, [matrix])

  return {
    createMatrix,
    matrixSum
  }
}