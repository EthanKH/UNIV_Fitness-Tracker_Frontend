import React from 'react';
import './style.css';
import {
    activities,
    home,
    register,
    login,
    myRoutines,
    routines,    
}   from './components';

const App = () => {

}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);