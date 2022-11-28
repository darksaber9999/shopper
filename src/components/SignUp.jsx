import React from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkErrorBeforeSave } from "../validations";

const SignUp = ({ createEventArray, handleValidations, errorMessage, passwordMask }) => {

  const inputData = [
    { key: 1, id: 'emailAddress', label: 'Email Address', name: 'emailAddress', type: 'email', error: 'emailAddressError' },
    { key: 2, id: 'password', label: 'Password', name: 'password', type: 'password', error: 'passwordError' },
    { key: 3, id: 'passwordConfirm', label: 'Confirm Password', name: 'passwordConfirm', type: 'password', error: 'passwordError' },
    { key: 4, id: 'firstName', label: 'First Name', name: 'firstName', type: 'text', error: 'firstNameError' },
    { key: 5, id: 'lastName', label: 'Last Name', name: 'lastName', type: 'text', error: 'lastNameError' },
  ]

  const handleBlur = ({ target: { name, value } }) => handleValidations(name, value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventArray = createEventArray(e);
    handleValidations('requiredValues', checkErrorBeforeSave(eventArray));
  }

  return (
    <div className="signUp-window">
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
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  )
}

export default SignUp;