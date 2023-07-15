import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TokenProvider from './contexts/tokenContext';
import Header from './components/Header/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

  <React.StrictMode>
    <TokenProvider>
      <App/>
    </TokenProvider>
  </React.StrictMode>
);

