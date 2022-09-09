import { MouseEventHandler } from "react"
import { InitialParameters } from "../../models/matrix.models"
import style from "./InputNumber.module.css"

interface InputNumberProps {
  title: string
  value: number
  increment: MouseEventHandler<HTMLButtonElement>
  decrement: MouseEventHandler<HTMLButtonElement>
  matrixSize: InitialParameters
  onChangeValue: (value: string, title: string) => void
}

const InputNumber = ({ title, increment, decrement, matrixSize, onChangeValue }: InputNumberProps) => {
  return (
    <div>
      <div className={style.inputName}>{title}</div>
      <div className={style.counterWrapp}>
        <button className={style.btnCounter} type="button" onClick={decrement}>-</button>
        <input type="text"
          className={style.count}
          value={matrixSize[title]}
          onChange={(e) => onChangeValue(e.target.value, title)}
        />
        <button className={style.btnCounter} type="button" onClick={increment}>+</button>
      </div>
    </div>
  )
}

export default InputNumber