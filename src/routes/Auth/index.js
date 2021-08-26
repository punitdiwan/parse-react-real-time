import "./Auth.css";
import React, { useState } from "react";
import Parse from "parse";
import { useHistory } from 'react-router-dom' 

const Auth = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);

  const history = useHistory();

  const handleLogin = () => {
    const user = new Parse.User();
    
    user.set('username', userName);
    user.set('password', password);

    user.logIn().then((user) => {
      history.push('/')
    }).catch(err => {      
      alert(err.message);
    });
  };
  const handleRegister = () => {
    const user = new Parse.User();
    
    user.set('username', userName);
    user.set('password', password);

    user.signUp().then(() => {
      handleLogin();
    }).catch(err => alert(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      handleRegister();
      return;
    }
    handleLogin();
  };
  const toggleIsRegistering = () => setIsRegistering(!isRegistering);

  const [toggleRegisterText, authActiontext] = isRegistering
    ? ["use an existing account", "Register"]
    : ["Create an account", "Login"];

  return (
    <div className="auth-container">
      <h1>Auth</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={toggleIsRegistering}>{toggleRegisterText}</span>
        <button type="submit">{authActiontext}</button>
      </form>
    </div>
  );
};

export default Auth;