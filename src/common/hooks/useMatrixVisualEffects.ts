import { Matrix } from "../../models/matrix.models"


export function useMatrixVisualEffects() {

  const cellsAmount = (event: React.MouseEvent<HTMLElement>, matrix: Matrix, x: number) => {
    const closeAmount: { id: number, amount: number }[] = []
    const cellsArray: { id: number, amount: number }[] = []
    let currentCell: any

    if (event.type === 'mouseout') {
      return []
    }

    for (let rowMatrix of matrix) {
      for (let cellMatrix of rowMatrix) {
        if (+(event.target as HTMLElement).dataset.id! === +cellMatrix.id) {
          currentCell = cellMatrix
          continue
        } 
        cellsArray.push(cellMatrix)
      }
    }

    cellsArray.sort((a: { amount: number }, b: { amount: number }) => a.amount - b.amount)

    for (let i = 0; i < x; i++) {
   
      const closest = cellsArray.reduce((a,b) => Math.abs(b.amount-currentCell.amount) < Math.abs(a.amount-currentCell.amount) ? b : a);
      const currentIndex = cellsArray.findIndex((element) => element.id === closest.id)
      closeAmount.push(...cellsArray.splice(currentIndex, 1))

    }

    return closeAmount
 
  }

  return {
    cellsAmount
  }

}