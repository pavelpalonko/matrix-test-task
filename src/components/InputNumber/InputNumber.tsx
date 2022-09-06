import style from "./InputNumber.module.css"

interface InputNumberProps {
  title: string
  value: number
  increment: any
  decrement: any
  matrixSize: any
  setMatrixSize: any
}

const InputNumber = ({ title, value, increment, decrement, matrixSize, setMatrixSize }: InputNumberProps) => {
  return (
    <div>
      <div className={style.inputName}>{title}</div>
      <div className={style.counterWrapp}>
        <button className={style.btnCounter} type="button" onClick={decrement}>-</button>
        <input type="text"
          className={style.count}
          value={matrixSize[title]}
          onChange={(e) => setMatrixSize({ ...matrixSize, [title]: e.target.value })}
        />
        <button className={style.btnCounter} type="button" onClick={increment}>+</button>
      </div>
    </div>
  )
}

export default InputNumber