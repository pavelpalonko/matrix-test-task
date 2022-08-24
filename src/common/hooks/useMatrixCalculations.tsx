import { Matrix, MatrixDerivedProperties } from "../../models/matrix.models"

export function useMatrixCalculations() {

  const buildMatrix = (rowMatrix: number, colMatrix: number, randomInt: Function, generetorId: Function) => {
    const matrix: Matrix = []

    for (let rowIndex = 0; rowIndex < rowMatrix; rowIndex++) {
      matrix.push([])

      for (let colIndex = 0; colIndex < colMatrix; colIndex++) {
        matrix[rowIndex].push({ id: generetorId(), amount: randomInt(100, 999) })
      }
    }

    return matrix
  }

  const calculateMatrix = (rowMatrix: number, colMatrix: number, matrix: Matrix,) => {
    const matrixSum: MatrixDerivedProperties = { rowSumValues: [], columnAverageValues: [] }

    for (let row of matrix) {
      matrixSum.rowSumValues.push(row.reduce((sum: number, current: {amount: number}) => sum + current.amount, 0))
    }

    for (let colIndex = 0; colIndex < colMatrix; colIndex++) {
      let sum = 0
      for (let col of matrix) {
        sum += col[colIndex]?.amount
      }
      matrixSum.columnAverageValues.push(Math.round(sum / rowMatrix))
    }

    return matrixSum
  }

  return {
    buildMatrix,
    calculateMatrix
  }

}