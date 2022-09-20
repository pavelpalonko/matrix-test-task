import React from 'react';
import InputForm from './components/FormInput/FormInput';
import MainPage from './pages/MainPage';
import { InitialParamServer } from './models/matrix.models'

interface AppProps {
  initState: InitialParamServer
}

function App({ initState }: AppProps) {

  return (
    <div>
      {initState.m
        ? <MainPage initialParam={initState} />
        : <InputForm />
      }
    </div>
  );
}

export default App;
