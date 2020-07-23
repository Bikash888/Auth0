import React from 'react';
import Login from './Login/login';
import './App.css';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div>
        <Login/>
    </div>
    </BrowserRouter>
  );
}

export default App;
