import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
import { DarkModeContextProvider } from './components/darkModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </React.StrictMode>
);