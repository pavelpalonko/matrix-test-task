export interface MatrixCell {
  id: number
  amount: number
}

export type MatrixRow = MatrixCell[]
export type Matrix = MatrixRow[]

export interface MatrixDerivedProperties {
  rowSumValues: number[],
  columnAverageValues: number[]
}

export interface InitialParameters {
  [index: string]: number
  M: number
  N: number 
  X: number 
}