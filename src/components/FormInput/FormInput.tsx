import React, { useCallback, useState } from 'react'
import style from './FormInput.module.css'
import InputNumber from '../InputNumber/InputNumber'
import { useNavigate } from 'react-router-dom'
import { InitialParameters } from '../../models/matrix.models'

const InputForm = () => {

  const [matrixSize, setMatrixSize] = useState<InitialParameters>({ M: 0, N: 0, X: 0 })
  const navigate = useNavigate()

  const onChangeValue = (value: string, title: string) => {
    const newValue = value.replace(/[^0-9]/g, '')
    if (+newValue > 100) return
    setMatrixSize({ ...matrixSize, [title]: +newValue })
  }

  const incrementInitialParameters = useCallback((fieldName: string) => {
    if (fieldName === 'X' && matrixSize.X === (matrixSize.M * matrixSize.N)) return
    if (fieldName === 'M' && matrixSize[fieldName] >= 100) return
    if (fieldName === 'N' && matrixSize[fieldName] >= 100) return

    setMatrixSize({ ...matrixSize, [fieldName]: ++matrixSize[fieldName] })
  }, [matrixSize])

  const decrementInitialParameters = useCallback((fieldName: string) => {
    if (matrixSize[fieldName] === 0) return

    setMatrixSize({ ...matrixSize, [fieldName]: --matrixSize[fieldName] })
  }, [matrixSize])

   const onSubmitHandler = () => {
    navigate(`/matrix-${matrixSize.M}-${matrixSize.N}-${matrixSize.X}`)
    window.location.reload()
   }

  return (
    <form onSubmit={onSubmitHandler} className={style.controller}>
      <InputNumber
        name='m'
        title={'M'}
        value={matrixSize.M}
        increment={() => incrementInitialParameters('M')}
        decrement={() => decrementInitialParameters('M')}
        matrixSize={matrixSize}
        onChangeValue={onChangeValue}
      />

      <InputNumber
        name='n'
        title={'N'}
        value={matrixSize.N}
        increment={() => incrementInitialParameters('N')}
        decrement={() => decrementInitialParameters('N')}
        matrixSize={matrixSize}
        onChangeValue={onChangeValue}
      />

      <InputNumber
        name='x'
        title={'X'}
        value={matrixSize.X}
        increment={() => incrementInitialParameters('X')}
        decrement={() => decrementInitialParameters('X')}
        matrixSize={matrixSize}
        onChangeValue={onChangeValue}
      />
      <button className={style.createMarix} type="submit">create</button>
    </form>
  )
}

export default InputForm