import React, { useState } from "react";
import auth0 from 'auth0-js';
import params from './auth0-param.json'
import './login.css';
import valiadtor from 'validator';

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
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    login(email,password)
  };

  const onResetPasswordHandler=(e)=>{
    e.preventDefault();
    auth0Client.changePassword({
      connection:'react-user-demo',
      email
    },(err,result)=>{
      if(err){
        console.log(err)
      }
      console.log(result)
    })
  }

 
 

 const login=(username,password)=>{
   let hasError=false;
   const errors={};
   if(!valiadtor.trim(email)){
     errors.email='Please fill in';
     hasError=true
   }
   if(!valiadtor.trim(password)){
     errors.email="Password is required"
     hasError=true;
   }
   setErrors(errors);
   if(errors){
    const errorElementId=Object.keys(errors)[0];
    const element=document.getElementById(errorElementId);
    if(element){ 
      element.scrollIntoView({block:'center',behavior:'smooth',inline:'center'})
      element.focus()
    }
  }
  console.log(hasError)
   if(hasError){
     setSending(false);
     return;
   }

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
        {errors.email !== "" && <p className="form-error">{errors.email}</p>}
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
        {errors.password !== "" && <p className="form-error">{errors.password}</p>}
       
        <button type="submit">Submit</button>
        <br/>
        <button type='submit' onClick={onResetPasswordHandler}>Reset password</button>

      </form>
      
    </div>
    </div>
  );
};

export default LoginButton;
