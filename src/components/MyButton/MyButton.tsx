import style from "./MyButton.module.css"

interface MyButtonProps {
  inner: string
  onClickHandler: () => void
}

const MyButton = ({inner, onClickHandler}: MyButtonProps) => {
  return (
    <button className={style.myBtn} onClick={onClickHandler}>
      {inner}
    </button>
  )
}

export default MyButton