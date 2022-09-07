import React, { useState } from "react"
import style from './MainPage.module.css'
import { InitialParameters } from "../models/matrix.models"
import MatrixTable from "../components/MatrixTable/MatrixTable"
import InputNumber from "../components/InputNumber/InputNumber"

const MainPage = () => {

  const [matrixSize, setMatrixSize] = useState<InitialParameters>({ M: 0, N: 0, X: 0 })

  const onChangeValue = (value: any, title: string) => {
    const newValue = value.replace(/[^0-9]/g,'')
    if (newValue > 100) return
    setMatrixSize({...matrixSize, [title]: newValue})
  }

  const incrementInitialParameters = (fieldName: string) => {
    if (fieldName === 'X' && matrixSize.X === (matrixSize.M * matrixSize.N)) return
    if (fieldName === 'M' && matrixSize[fieldName] >= 100) return
    if (fieldName === 'N' && matrixSize[fieldName] >= 100) return

    setMatrixSize({ ...matrixSize, [fieldName]: ++matrixSize[fieldName] })
  }

  const decrementInitialParameters = (fieldName: string) => {
    if (matrixSize[fieldName] === 0) return

    setMatrixSize({ ...matrixSize, [fieldName]: --matrixSize[fieldName] })
  }

  return (
    <div className={style.mainPage}>
      <div className={style.controller}>
        <InputNumber
          title={'M'}
          value={matrixSize.M}
          increment={() => incrementInitialParameters('M')}
          decrement={() => decrementInitialParameters('M')}
          matrixSize={matrixSize}
          onChangeValue={onChangeValue }
        />

        <InputNumber
          title={'N'}
          value={matrixSize.N}
          increment={() => incrementInitialParameters('N')}
          decrement={() => decrementInitialParameters('N')}
          matrixSize={matrixSize}
          onChangeValue={onChangeValue }
        />

        <InputNumber
          title={'X'}
          value={matrixSize.X}
          increment={() => incrementInitialParameters('X')}
          decrement={() => decrementInitialParameters('X')}
          matrixSize={matrixSize}
          onChangeValue={onChangeValue }
        />

      </div>
      <div className={style.matrixWrapp}>
        <MatrixTable matrixSize={matrixSize} setMatrixSize={setMatrixSize} />
      </div>
    </div>
  )
}

export default MainPage