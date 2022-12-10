import React from "react";
import { checkErrorBeforeSave } from "../validations";

const Shipping = ({ errorMessage, toggleShippingWindow, createEventArray, createEventObject, handleValidations }) => {

  const inputData = [
    { key: 1, id: 'name', label: 'Name', name: 'name', type: 'text', error: 'nameError' },
    { key: 2, id: 'addressLine1', label: 'Address Line 1', name: 'addressLine1', type: 'text', error: 'addressLine1Error' },
    { key: 3, id: 'addressLine2', label: 'Address Line 2', name: 'addressLine2', type: 'text', error: 'addressLine2Error' },
    { key: 4, id: 'city', label: 'City', name: 'city', type: 'text', error: 'cityError' },
    { key: 5, id: 'state', label: 'State', name: 'state', type: 'text', error: 'stateError' },
    { key: 6, id: 'country', label: 'Country', name: 'country', type: 'text', error: 'countryError' },
    { key: 7, id: 'zipCode', label: 'Zip Code', name: 'zipCode', type: 'text', error: 'zipCodeError', maxLength: 5 },
    { key: 8, id: 'phoneNumber', label: 'Phone Number', name: 'phoneNumber', type: 'text', error: 'phoneNumberError', pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}', maxLength: 12 },
  ];

  const shippingInputData = [
    { key: 21, id: 'standardShipping', value: 'standard', name: 'shipping', type: 'radio', label: 'Standard', defaultChecked: true, },
    { key: 22, id: 'expressShipping', value: 'express', name: 'shipping', type: 'radio', label: 'Express', defaultChecked: false, },
  ];

  const clickToCloseShippingWindow = (e) => {
    if (e.target.classList.contains('shipping-pane')) {
      e.target.children[0].addEventListener('animationend', () => toggleShippingWindow());
      e.target.children[0].classList.remove('animate__zoomIn');
      e.target.children[0].classList.add('animate__zoomOut');
      e.target.children[0].removeEventListener('animationend', () => toggleShippingWindow());
    }
  }

  const handleBlur = ({ target: { name, value } }) => handleValidations(name, value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventArray = createEventArray(e);
    handleValidations('requiredValues', checkErrorBeforeSave(eventArray));

    console.log(eventArray);
  }

  return (
    <div className="shipping-pane" onClick={clickToCloseShippingWindow}>
      <div className="shipping-window animate__animated animate__zoomIn">
        <h3>Shipping</h3>
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
          </div>
          <h3>Shipping Method</h3>
          <div className="shipping-display shipping-window-switcher">
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
          <input type="submit" value="Payment" />
        </form>
      </div>
    </div>)
}

export default Shipping;