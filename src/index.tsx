import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import 'react-phone-number-input/style.css'
import {Provider} from "react-redux"
import { store } from './store/configureStore';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MantineProvider>
        <App />
        </MantineProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
