import React, { useState } from "react";
import valiadtor from "validator";
import params from "../auth0-param.json";
import auth0 from "auth0-js";
import "./login.css";
import { Input, Form, Button, message } from "antd";
import ForgotPassword from '../Forgot-password';
import "antd/dist/antd.css";

const Login = () => {
  var auth0Client = new auth0.WebAuth({
    domain: params.domain,
    clientID: params.clientId,
    audience: params.apiAudience,
    redirectUri: params.callbackUrl,
    scope: params.scope,
    responseType: "token id_token",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    login(email, password);
  };

  

  const login = (username: any, password: any) => {
    let hasError = false;
    const errors: any = {};
    if (!valiadtor.trim(email)) {
      errors.email = "Please fill in";
      hasError = true;
    }
    if (!valiadtor.trim(password)) {
      errors.email = "Password is required";
      hasError = true;
    }
    setErrors(errors);
    if (hasError) {
      setSending(false);
      return;
    }
    if (errors) {
      const errorElementId = Object.keys(errors)[0];
      const element = document.getElementById(errorElementId);
      if (element) {
        element.scrollIntoView({
          block: "center",
          behavior: "smooth",
          inline: "center",
        });
        element.focus();
      }
    }
    auth0Client.client.login(
      {
        realm: "demo-db",
        username,
        password,
      },
      (err: any, authResult: any) => {
        if (err) {
          message.error(err.description)
          return;
        }
        if (authResult) {
          message.success("Login Successfully")
        }
      }
    );
  };
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="login-title">
          <strong>Log in to Dashboard</strong>
        </div>
        <div className="container">
          <Form>
            <Form.Item>
              <Input
                size="large"
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Input.Password className="input" size="large" 
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size='large'
                onClick={onSubmitHandler}
              >
                Log in
              </Button>
            </Form.Item>
          
          </Form>
          <a href="/reset">forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
