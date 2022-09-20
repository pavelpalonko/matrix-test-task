import React, { useMemo } from "react"
import style from './MainPage.module.css'
import { InitialParameters } from "../models/matrix.models"
import MatrixTable from "../components/MatrixTable/MatrixTable"

const MainPage = ({ initialParam }: any) => {

  const matrixSize: InitialParameters = useMemo(() => {
    return {
      M: +initialParam.m,
      N: +initialParam.n,
      X: +initialParam.x
    }
  }, [initialParam])

  return (
    <div className={style.mainPage}>
      <div className={style.matrixWrapp}>
        <MatrixTable matrixSize={matrixSize} />
      </div>
    </div>
  )
}

export default MainPage
