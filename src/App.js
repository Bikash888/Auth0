import React from 'react';
import Login from './Login/login';
import './App.css';
import {BrowserRouter, Link,Route} from 'react-router-dom';
import ResetPassword from './Forgot-password/forgot-password';

function App() {
  return (
 
   <BrowserRouter>
     <Route path="/reset" exact component={ResetPassword} />
     <Route path="/" component={Login} />
   </BrowserRouter>
   
  );
}

export default App;
