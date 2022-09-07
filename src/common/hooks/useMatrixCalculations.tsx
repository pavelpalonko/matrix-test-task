import { useCallback } from "react"
import { Matrix, MatrixDerivedProperties } from "../../models/matrix.models"

export function useMatrixCalculations() {

  const buildMatrix = (rowMatrix: number, colMatrix: number, randomInt: Function, generetorId: Function) => {

   return Array.from({length: rowMatrix}, () => (Array.from({length: colMatrix}, () => ({id: generetorId(), amount: randomInt(100, 999)}))))
  
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
    }, Array.from({length: matrix[0]?.length}, () => ({average: 0}))).map((el) => Math.round(el.average / rowMatrix))

    return matrixSum
  }, [])

  return {
    buildMatrix,
    calculateMatrix
  }

}