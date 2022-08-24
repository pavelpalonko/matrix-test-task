import { MouseEventHandler, useState } from 'react'
import style from './MatrixTableDisplayer.module.css'
import { Matrix, MatrixCell, MatrixRow } from "../../models/matrix.models"
import { v4 as uuidv4 } from 'uuid';

interface MatrixTableDisplayProps {
  matrix: Matrix
  onMouseOutEvent: MouseEventHandler<HTMLElement>
  deleteRow: MouseEventHandler<HTMLElement>
  onMouseOverEvent: MouseEventHandler<HTMLElement>
  onClickEvent: MouseEventHandler<HTMLElement>
  rowSum: number[]
  matrixColumnMid: number[]
}

const MatrixTableDisplayer = ({ matrix, onMouseOutEvent, deleteRow, onMouseOverEvent, onClickEvent, rowSum, matrixColumnMid }: MatrixTableDisplayProps) => {

  const [indexRow, setIndexRow] = useState<any>()

  const showPercente = (index: number) => {
    setIndexRow(index)
  }

  return (
    <table>
      <tbody onClick={onClickEvent} onMouseOver={onMouseOverEvent} onMouseOut={onMouseOutEvent}>
        {
          matrix.map((rowMarix: MatrixRow, index: number) => (
              <tr key={index}>
                <td onClick={deleteRow} data-index={index} className={style.deleteBtn}>✖</td>
                {rowMarix.map((cell: MatrixCell) =>
                
                  <td key={cell.id} data-id={cell.id} className={style.tdCell}>
                    
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
            matrixColumnMid.length
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