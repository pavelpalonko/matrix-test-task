import { useCallback } from "react"
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

  const calculateMatrix = useCallback( (rowMatrix: number, colMatrix: number, matrix: Matrix,) => {
    const matrixSum: MatrixDerivedProperties = { rowSumValues: [], columnAverageValues: [] }

    matrix.forEach(row => {
      matrixSum.rowSumValues.push(row.reduce((sum: number, current: {amount: number}) => sum + current.amount, 0))
    })

 
    matrixSum.columnAverageValues = matrix.reduce((sum, row) => {
      row.forEach((elem, index) => {
        sum[index].average += elem.amount
      })
      return sum
    }, Array.from({length: colMatrix}, () => ({average: 0}))).map((el) => Math.round(el.average / rowMatrix))

 
    return matrixSum
  }, [])

  return {
    buildMatrix,
    calculateMatrix
  }

}