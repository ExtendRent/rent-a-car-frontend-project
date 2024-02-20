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
import { Provider } from "react-redux";
import { store } from './store/configureStore';

// Create a theme with default options
const defaultTheme = createTheme({});

// Create a custom theme with your desired options
const customTheme = createTheme({
  colors: {
    background: ['#FA5252', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#808080'],
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* Merge default theme with custom theme */}
      <MantineProvider>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
