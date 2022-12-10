import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthWindow = ({ login, signUp, errorMessage, currentUsers, userLoggedIn, toggleDisplay, toggleAuthWindow, createEventArray, createEventObject, handleValidations, addNewUser, toggleUserLoggedIn }) => {

  const swapAuthOption = () => {
    toggleDisplay('signUp');
    toggleDisplay('login');
  }

  const passwordMask = () => {
    const currentFieldType = document.getElementById('password').type;
    const newType = (currentFieldType === 'password') ? 'text' : 'password';
    document.getElementById('password').type = newType;
    if (signUp) {
      document.getElementById('passwordConfirm').type = newType;
    }
  }

  const clickToCloseAuthWindow = (e) => {
    if (e.target.classList.contains('auth-pane')) {
      e.target.children[0].addEventListener('animationend', () => toggleAuthWindow());
      e.target.children[0].classList.remove('animate__zoomIn');
      e.target.children[0].classList.add('animate__zoomOut');
      e.target.children[0].removeEventListener('animationend', () => toggleAuthWindow());
    }
  }

  return (
    <div className="auth-pane" onClick={clickToCloseAuthWindow}>
      <div className="auth-window animate__animated animate__zoomIn">
        {(login || signUp) && !userLoggedIn ?
          <div className="auth-window-switcher">
            <label htmlFor="login">
              <input
                type="radio"
                value="login"
                id="login"
                name="authOption"
                onChange={swapAuthOption}
                defaultChecked={login}
              />
              <h3>Login</h3>
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
              <h3>Sign Up</h3>
            </label>
          </div>
          : null}
        {login && !userLoggedIn ?
          <Login
            errorMessage={errorMessage}
            toggleAuthWindow={toggleAuthWindow}
            currentUsers={currentUsers}
            createEventArray={createEventArray}
            createEventObject={createEventObject}
            handleValidations={handleValidations}
            toggleUserLoggedIn={toggleUserLoggedIn}
            passwordMask={passwordMask}
          />
          : null}
        {signUp && !userLoggedIn ?
          <SignUp
            errorMessage={errorMessage}
            toggleAuthWindow={toggleAuthWindow}
            createEventArray={createEventArray}
            createEventObject={createEventObject}
            handleValidations={handleValidations}
            addNewUser={addNewUser}
            toggleUserLoggedIn={toggleUserLoggedIn}
            passwordMask={passwordMask}
          />
          : null}
        {userLoggedIn ?
          <div className="logout-window">
            <button onClick={toggleUserLoggedIn}>Logout</button>
          </div>
          : null}
      </div>
    </div>
  )
}

export default AuthWindow;