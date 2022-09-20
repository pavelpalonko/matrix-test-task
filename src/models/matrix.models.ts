export interface MatrixCell {
  id: number
  amount: number
  rowId: number
}

export type MatrixRow = MatrixCell[]
export type Matrix = MatrixRow[]

export interface RowSum {
  rowSum: number
  sumId: number
}

export interface CellAverage {
  average: number
  averageId: number
}

export interface MatrixDerivedProperties {
  rowSumValues: RowSum[],
  columnAverageValues: CellAverage[]
}

export interface CurrentSumCell {
  sumId: number
  index: number
}

export interface InitialParameters {
  [index: string]: number
  M: number
  N: number 
  X: number 
}

export interface InitialParamServer {
  m: string
  n: string 
  x: string 
}