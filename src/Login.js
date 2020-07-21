import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import auth0 from 'auth0-js';
const LoginButton = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = () => {};
  var auth0Client = new auth0.WebAuth({
    clientID: 'EODntLUB9mdPWL1cYEq17U7n90nYSeup',
    domain: 'dev-zsxk7zyg.us.auth0.com'
  });

  const login=()=>{
    auth0Client.client.login({
      realm:'kol-auth',
      
    })
  }
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>
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
  );
};

export default LoginButton;
