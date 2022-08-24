import style from "./MyButton.module.css"

const MyButton = ({inner, onClick}: any) => {
  return (
    <button className={style.myBtn} onClick={onClick}>
      {inner}
    </button>
  )
}

export default MyButton