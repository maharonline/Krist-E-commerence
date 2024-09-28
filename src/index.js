import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./config/global"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './Context/AuthContext';
import ReadContext from './Context/ReadContext';
import ReadProfileContext from './Context/ReadProfileContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext>
      <ReadContext>
        <ReadProfileContext>


      <BrowserRouter>
        <App />
      </BrowserRouter>
        </ReadProfileContext>
      </ReadContext>
    </AuthContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
