import { useMemo } from "react"
import { Matrix, MatrixCell, MatrixRow } from "../../models/matrix.models"

export function useMatrixVisualEffects(currentCell: MatrixCell, matrix: Matrix, x: number) {

  const cellsAmount = useMemo( () => {
    const closeAmount: MatrixRow = []

    if (currentCell.amount === 0) return []
    
    const flatCellsArr = matrix.map((row) => row.filter((cell) => currentCell.id !== cell.id)).flat()

    flatCellsArr.sort((a: { amount: number }, b: { amount: number }) => a.amount - b.amount)

    for (let i = 0; i < x; i++) {
      const closest = flatCellsArr.reduce((a,b) => Math.abs(b.amount-currentCell.amount) < Math.abs(a.amount-currentCell.amount) ? b : a);
      const currentIndex = flatCellsArr.findIndex((element) => element.id === closest.id)
      closeAmount.push(...flatCellsArr.splice(currentIndex, 1))
    }

    return closeAmount
  }, [currentCell, matrix, x])

  return {
    cellsAmount
  }
}