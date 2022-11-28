import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { checkErrorBeforeSave } from "../validations";

const Login = ({ createEventArray, handleValidations, errorMessage, passwordMask }) => {

  const inputData = [
    { key: 1, id: 'emailAddress', label: 'Email Address', name: 'emailAddressLogin', type: 'email', error: 'emailAddressLoginError' },
    { key: 2, id: 'password', label: 'Password', name: 'passwordLogin', type: 'password', error: 'passwordLoginError' },
  ]

  const handleBlur = ({ target: { name, value } }) => handleValidations(name, value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventArray = createEventArray(e);
    handleValidations('requiredValues', checkErrorBeforeSave(eventArray));
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