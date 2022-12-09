import React from "react";
import { checkErrorBeforeSave } from "../validations";

const Shipping = ({ errorMessage, createEventArray, createEventObject, handleValidations }) => {

  const inputData = [
    { key: 1, id: 'addressTitle', label: 'Address Title', name: 'addressTitle', type: 'text', error: 'addressTitleError' },
    { key: 2, id: 'name', label: 'Name', name: 'name', type: 'text', error: 'nameError' },
    { key: 3, id: 'addressLine1', label: 'Address Line 1', name: 'addressLine1', type: 'text', error: 'addressLine1Error' },
    { key: 4, id: 'addressLine2', label: 'Address Line 2', name: 'addressLine2', type: 'text', error: 'addressLine2Error' },
    { key: 5, id: 'city', label: 'City', name: 'city', type: 'text', error: 'cityError' },
    { key: 6, id: 'state', label: 'State', name: 'state', type: 'text', error: 'stateError' },
    { key: 7, id: 'country', label: 'Country', name: 'country', type: 'text', error: 'countryError' },
    { key: 8, id: 'zipCode', label: 'Zip Code', name: 'zipCode', type: 'text', error: 'zipCodeError', maxLength: 5 },
    { key: 9, id: 'phoneNumber', label: 'Phone Number', name: 'phoneNumber', type: 'text', error: 'phoneNumberError', pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}', maxLength: 12 },
  ];

  const shippingInputData = [
    { key: 21, id: 'standardShipping', value: 'standard', name: 'shipping', type: 'radio', label: 'Standard', defaultChecked: true, },
    { key: 22, id: 'expressShipping', value: 'express', name: 'shipping', type: 'radio', label: 'Express', defaultChecked: false, },
  ];

  const handleBlur = ({ target: { name, value } }) => handleValidations(name, value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventArray = createEventArray(e);
    handleValidations('requiredValues', checkErrorBeforeSave(eventArray));
  }

  return (
    <div className="shipping-pane">
      <div className="shipping-window animate__animated animate__zoomIn">
        <span>Shipping</span>
        <form onSubmit={handleSubmit}>
          <div className="shipping-display">
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
                  pattern={item.pattern ? item.pattern : null}
                  onBlur={handleBlur}
                  maxLength={item.maxLength ? item.maxLength : null}
                />
                <div className="error-message">
                  {(errorMessage
                    && errorMessage[item.error]
                    && errorMessage[item.error].length > 1)
                    ? errorMessage[item.error]
                    : null}
                </div>
              </label>
            )) : null}
            <h3>Shipping Method</h3>
            {shippingInputData.length ? shippingInputData.map((item) => (
              <label
                key={item.key}
                htmlFor={item.id}
              >
                <input
                  id={item.id}
                  autoComplete="off"
                  value={item.value}
                  type={item.type}
                  name={item.name}
                  defaultChecked={item.defaultChecked}
                />
                {item.label}
              </label>
            )) : null}
          </div>
          <input className="inputSubmitButton" type="submit" value="Payment" />
        </form>
      </div>
    </div>)
}

export default Shipping;