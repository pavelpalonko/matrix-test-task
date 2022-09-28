import React, { useMemo } from "react"
import style from './MainPage.module.css'
import { InitialParameters, InitialParamServer } from "../models/matrix.models"
import MatrixTable from "../components/MatrixTable/MatrixTable"

interface MainPageProps {
  initialParam: InitialParamServer
}

const MainPage = ({ initialParam }: MainPageProps) => {

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
