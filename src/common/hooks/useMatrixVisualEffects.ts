import { Matrix, MatrixCell } from "../../models/matrix.models"

export function useMatrixVisualEffects() {

  const cellsAmount = (currentCell: MatrixCell, matrix: Matrix, x: number) => {
    const closeAmount: { id: number, amount: number }[] = []

    if (currentCell === undefined) return []
    
    const flatCellsArr = matrix.map((row) => row.filter((cell) => currentCell.id !== cell.id)).flat()

    flatCellsArr.sort((a: { amount: number }, b: { amount: number }) => a.amount - b.amount)

    for (let i = 0; i < x; i++) {
      const closest = flatCellsArr.reduce((a,b) => Math.abs(b.amount-currentCell.amount) < Math.abs(a.amount-currentCell.amount) ? b : a);
      const currentIndex = flatCellsArr.findIndex((element) => element.id === closest.id)
      closeAmount.push(...flatCellsArr.splice(currentIndex, 1))
    }

    return closeAmount
 
  }

  return {
    cellsAmount
  }
}