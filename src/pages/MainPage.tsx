import React, { useState } from "react"
import { InitialParameters } from "../models/matrix.models"
import MatrixTable from "../components/MatrixTable/MatrixTable"
import InputNumber from "../components/InputNumber/InputNumber"

const MainPage = () => {

  const [matrixSize, setMatrixSize] = useState<InitialParameters>({ M: 0, N: 0, X: 0 })

  const incrementInitialParameters = (fieldName: string) => {
    if (fieldName === 'X' && matrixSize.X === (matrixSize.M * matrixSize.N)) return
    if (matrixSize[fieldName] === 100) return

    setMatrixSize({...matrixSize, [fieldName]: ++matrixSize[fieldName]})
  }

  const decrementInitialParameters = (fieldName: string) => {
    if (matrixSize[fieldName] === 0) return

    setMatrixSize({...matrixSize, [fieldName]: --matrixSize[fieldName]})
  }
 
  return (
    <div className="main-page">
      <div className='controller'>
        <InputNumber title={'M'} value={matrixSize.M} increment={() => incrementInitialParameters('M')} decrement={() => decrementInitialParameters('M')}/>
        <InputNumber title={'N'} value={matrixSize.N} increment={() => incrementInitialParameters('N')} decrement={() => decrementInitialParameters('N')}/>
        <InputNumber title={'X'} value={matrixSize.X} increment={() => incrementInitialParameters('X')} decrement={() => decrementInitialParameters('X')}/>
      </div>
      <div className='matrix-wrapp'>
        <MatrixTable matrixSize={matrixSize} setMatrixSize={setMatrixSize} />
      </div>
    </div>
  )
}

export default MainPage