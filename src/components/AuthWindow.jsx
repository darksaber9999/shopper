import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthWindow = ({ login, signUp, toggleDisplay, createEventArray, handleValidations, errorMessage }) => {

  const swapAuthOption = () => {
    toggleDisplay('signUp');
    toggleDisplay('login');
  }

  const passwordMask = () => {
    const currentFieldType = document.getElementById('password').type;
    const newType = (currentFieldType === 'password') ? 'text' : 'password';
    document.getElementById('password').type = newType;
    document.getElementById('passwordConfirm').type = newType;
  }

  return (
    <div className="auth-window">
      {login || signUp ?
        <div>
          <label htmlFor="login">
            <input
              type="radio"
              value="login"
              id="login"
              name="authOption"
              onChange={swapAuthOption}
              defaultChecked={login}
            />
            <span>Login</span>
          </label>
          <label htmlFor="signUp">
            <input
              type="radio"
              value="signUp"
              id="signUp"
              name="authOption"
              onChange={swapAuthOption}
              defaultChecked={signUp}
            />
            <span>Sign Up</span>
          </label>
        </div>
        : null}
      {login ?
        <Login
          createEventArray={createEventArray}
          handleValidations={handleValidations}
          errorMessage={errorMessage}
          passwordMask={passwordMask}
        />
        : null}
      {signUp ?
        <SignUp
          createEventArray={createEventArray}
          handleValidations={handleValidations}
          errorMessage={errorMessage}
          passwordMask={passwordMask}
        />
        : null}
    </div>
  )
}

export default AuthWindow;