import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { InitialParamServer } from './models/matrix.models'

declare global {
  interface Window {
    __INITIAL_STATE__: InitialParamServer
  }
}

const initState = window.__INITIAL_STATE__

const root = ReactDOM.hydrateRoot( document.getElementById('root')!, <App initState={initState}/>)

root.render(
 <App initState={initState}/>
);

