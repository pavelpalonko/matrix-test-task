import React from 'react';
import InputForm from './components/FormInput/FormInput';
import MainPage from './pages/MainPage';
import { Routes, Route } from 'react-router-dom'
import { InitialParamServer } from './models/matrix.models'

interface AppProps {
  initState: InitialParamServer
}

function App({ initState }: AppProps) {

  return (
    <div>
      <Routes>
        <Route path='/' element={<InputForm/>}/>
        <Route path='/matrix-:m-:n-:x' element={<MainPage initialParam={initState}/>}/>
      </Routes>
    </div>
  );
}

export default App;