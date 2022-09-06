import { useState } from 'react'
import style from './MatrixTableDisplayer.module.css'
import { Matrix, MatrixCell, MatrixRow } from "../../models/matrix.models"
import { v4 as uuidv4 } from 'uuid';

interface MatrixTableDisplayProps {
  matrix: Matrix
  closestCells: MatrixRow
  removeHighlightsCells: Function
  deleteRow: Function
  highlightCells: Function
  incrementsAmount: Function
  rowSum: number[]
  matrixColumnMid: number[]
}

const MatrixTableDisplayer = ({ matrix, closestCells, removeHighlightsCells, deleteRow, highlightCells, incrementsAmount, rowSum, matrixColumnMid }: MatrixTableDisplayProps) => {

  console.log(matrixColumnMid)
  const [indexRow, setIndexRow] = useState<any>()

  const showPercente = (index: number) => {
    setIndexRow(index)
  }

  const isClosestCells = (currentId: number) => {
    if(closestCells.length === 0) return false
    for (let cell of closestCells) {
      if(cell.id === currentId) return true
    }
  }

  return (
    <table>
      <tbody>
        {
          matrix.map((rowMarix: MatrixRow, index: any) => (
              <tr key={index}>
                <td onClick={() =>deleteRow(index)} id={index} className={style.deleteBtn}>✖</td>
                {rowMarix.map((cell: MatrixCell) => 
                  <td 
                  onClick={() => incrementsAmount(cell.id)}
                  onMouseOver={() => highlightCells(cell.id)} 
                  onMouseOut={() => removeHighlightsCells()} 
                  key={cell.id} 
                  data-id={cell.id} 
                  className={isClosestCells(cell.id) ? style.tdCellBackLight : style.tdCell}>
                    {<div key={uuidv4()} style={
                      {
                        backgroundColor: "red",
                        opacity: '0.3',
                        height: `100%`,
                        width: indexRow === index ? `${Math.round((cell.amount / rowSum[index]) * 100)}%` : '0',
                        position: 'absolute',
                        top: '0',
                        left: '0'
                      }}></div >}
                    {indexRow === index ? `${Math.round((cell.amount / rowSum[index]) * 100)}%` : cell.amount}
                  </td>)
                }
                {
                  rowSum
                    ? <><td
                      key={uuidv4()}
                      data-control={true}
                      className={style.sumTd}
                      onMouseOver={() => showPercente(index)}
                      onMouseOut={() => setIndexRow('')}
                    >
                      {rowSum[index]}
                    </td></>
                    : null
                }
              </tr>
          ))
        }
        <tr className={style.trMid}>
          {
            matrixColumnMid[0] !== 0
              ? matrixColumnMid.map((elem: number) =>
                <td key={uuidv4()} className={style.tdMid}>
                  {elem}
                </td>)
              : null
          }
        </tr>
      </tbody>
    </table>
  )
}

export default MatrixTableDisplayer