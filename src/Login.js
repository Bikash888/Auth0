import React, { useState } from "react";
import auth0 from 'auth0-js';
import params from './auth0-param.json'
import './login.css';

const LoginButton = () => {
  var auth0Client = new auth0.WebAuth({
    domain: params.domain,
    clientID: params.clientId,
    audience: params.apiAudience,
    redirectUri: params.callbackUrl,
    scope: params.scope,
    responseType: 'token id_token'
  });

  const [email, setEmail] = useState("bikashdulal150@gmail.com");
  const [password, setPassword] = useState("Admin@123");


  const onSubmitHandler = (e) => {
    e.preventDefault();
    login(email,password)
  };

 
 
 

 const login=(username,password)=>{
    auth0Client.client.login({
      realm:'react-user-demo',
      username,
      password
    },(err,authResult)=>{
      if(err){
        console.log(err)
        alert("Error",err.description)
        return
      }
      if(authResult){
        console.log(authResult)
        window.origin=window.location.origin
      }
     
    })
  }
  return (
    <div className='wrapper'>
    <div className='form-wrapper'>
      <form onSubmit={onSubmitHandler}>
        <label >
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </label>
        <button type="submit">Submit</button>
      </form>
      
    </div>
    </div>
  );
};

export default LoginButton;
