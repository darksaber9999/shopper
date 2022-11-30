import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { checkErrorBeforeSave, isEmpty } from "../validations";

const Login = ({ errorMessage, toggleAuthWindow, currentUsers, createEventArray, createEventObject, handleValidations, toggleUserLoggedIn, passwordMask }) => {

  const inputData = [
    { key: 1, id: 'emailAddress', label: 'Email Address', name: 'emailAddressLogin', type: 'email', error: 'emailAddressLoginError' },
    { key: 2, id: 'password', label: 'Password', name: 'passwordLogin', type: 'password', error: 'passwordLoginError' },
  ]

  const handleBlur = ({ target: { name, value } }) => handleValidations(name, value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventArray = createEventArray(e);
    handleValidations('requiredValues', checkErrorBeforeSave(eventArray));

    if (!isEmpty(errorMessage) && !Object.values(errorMessage).filter((val) => val !== undefined).length) {
      const eventObject = createEventObject(eventArray);
      let userMatchFound = false;
      currentUsers.forEach((user) => {
        if (user.emailAddressLogin === eventObject.emailAddress) {
          user.passwordLogin === eventObject.password ?
            userMatchFound = true :
            userMatchFound = false;
        }
      });
      if (userMatchFound) {
        toggleUserLoggedIn();
        toggleAuthWindow();
      }
    }
  }

  return (
    <div className="login-window">
      <form onSubmit={handleSubmit}>
        {inputData.length ? inputData.map((item) => (
          <label
            key={item.key}
            htmlFor={item.id}
          >
            <input
              id={item.id}
              autoComplete="off"
              placeholder={item.label}
              type={item.type}
              name={item.name}
              onBlur={handleBlur}
            />
            <div className="error-message">
              {(errorMessage
                && errorMessage[item.error]
                && errorMessage[item.error].length > 1)
                ? errorMessage[item.error]
                : null}
            </div>
            {item.id === 'password' ? (
              <FontAwesomeIcon
                icon={faEye}
                onClick={passwordMask}
                className="passwordEyeIcon"
              />
            ) : null}
          </label>
        )) : null}
        <input type="submit" />
      </form>
    </div>
  )
}

export default Login;