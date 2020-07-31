import React from 'react';
import Login from './Login/login';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import ResetPassword from '../src/Forgot-password/index';

function App() {
  return (
 
   <BrowserRouter>
     <Route path="/reset" exact component={ResetPassword} />
     <Route path="/" component={Login} />
   </BrowserRouter>
   
  );
}

export default App;
