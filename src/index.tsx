import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { InitialParamServer } from './models/matrix.models'

declare global {
  interface Window {
    __INITIAL_STATE__: InitialParamServer
  }
}

const initState = window.__INITIAL_STATE__

const root = ReactDOM.hydrateRoot(document.getElementById('root')!,
  <BrowserRouter>
    <App initState={initState} />
  </BrowserRouter>
)

root.render(
  <BrowserRouter>
    <App initState={initState} />
  </BrowserRouter>
);