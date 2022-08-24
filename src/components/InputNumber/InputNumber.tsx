import style from "./InputNumber.module.css"

interface InputNumberProps {
  title: string
  value: number
  increment: any
  decrement: any
}

const InputNumber = ({ title, value, increment, decrement }: InputNumberProps) => {

  return (
    <div>
      <div className={style.inputName}>{title}</div>
      <div className={style.counterWrapp}>
        <button className={style.btnCounter} type="button" onClick={decrement}>-</button>
        <div className={style.count}>
          {value}
        </div>
        <button className={style.btnCounter} type="button" onClick={increment}>+</button>
      </div>
    </div>
  )
}

export default InputNumber