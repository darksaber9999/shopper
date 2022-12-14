import React from "react";
import { CARD, CARD_ICON, OTHER_CARDS } from "../constants";
import { checkErrorBeforeSave, isEmpty } from "../validations";

const Payment = ({ errorMessage, cardType, togglePaymentWindow, toggleConfirmWindow, createEventArray, createEventObject, handleValidations, addUserPaymentInfo, getCartTotal }) => {
  const cartTotal = getCartTotal();

  const inputData = [
    { key: 1, id: 'cardholderName', label: 'Cardholder Name', name: 'cardholderName', type: 'text', error: 'cardholderNameError' },
    { key: 2, id: 'cardNumber', label: 'Card Number', name: 'cardNumber', type: 'text', error: 'cardNumberError', maxLength: OTHER_CARDS.length, isCard: true },
    { key: 3, id: 'securityCode', label: 'Security Code/CVV', name: 'securityCode', type: 'text', error: 'securityCodeError', maxLength: 4 },
  ];

  const option1 = ['Expiration Month', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const option2 = ['Expiration Year', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2010'];

  const selectData = [
    { key: 21, id: 'expiryMonth', name: 'expiryMonth', option: option1, error: 'expiryMonthError' },
    { key: 22, id: 'expiryYear', name: 'expiryYear', option: option2, error: 'expiryYearError' },
  ];

  const clickToClosePaymentWindow = (e) => {
    if (e.target.classList.contains('payment-pane')) {
      e.target.children[0].addEventListener('animationend', () => togglePaymentWindow());
      e.target.children[0].classList.remove('animate__zoomIn');
      e.target.children[0].classList.add('animate__zoomOut');
      e.target.children[0].removeEventListener('animationend', () => togglePaymentWindow());
    }
  }

  const handleBlur = ({ target: { name, value } }) => handleValidations(name, value);

  const applyCreditCardNumberMask = (e) => {
    const tempValue = e.target.value.split(' ').join('');
    if (tempValue.length) {
      e.target.value = tempValue.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventArray = createEventArray(e);
    handleValidations('requiredValues', checkErrorBeforeSave(eventArray));

    if (!isEmpty(errorMessage) && !Object.values(errorMessage).filter((val) => val !== undefined).length && isEmpty(checkErrorBeforeSave(eventArray))) {
      const eventObject = createEventObject(eventArray);
      addUserPaymentInfo(eventObject);
      e.target.parentElement.addEventListener('animationend', () => togglePaymentWindow());
      e.target.parentElement.classList.remove('animate__zoomIn');
      e.target.parentElement.classList.add('animate__zoomOut');
      e.target.parentElement.removeEventListener('animationend', () => togglePaymentWindow());
      toggleConfirmWindow();
    }
  }

  return (
    <div className="payment-pane" onClick={clickToClosePaymentWindow}>
      <div className="payment-window animate__animated animate__zoomIn">
        <h3>Payment</h3>


        <form onSubmit={handleSubmit}>
          <div className="payment-display">
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
                  maxLength={item.maxLength ? item.maxLength : null}
                  onChange={item.id === 'cardNumber' ? applyCreditCardNumberMask : null}
                />
                <div className="error-message">
                  {(errorMessage
                    && errorMessage[item.error]
                    && errorMessage[item.error].length > 1)
                    ? errorMessage[item.error]
                    : null}
                </div>
                {item.isCard && CARD.includes(cardType) &&
                  <img
                    className="payment-window-card-image"
                    src={CARD_ICON[cardType]}
                    alt="card"
                  />
                }
              </label>
            )) : null}
            <div>
              {selectData.length ? selectData.map((item) => (
                <label
                  key={item.key}
                  htmlFor={item.id}
                >
                  <select
                    id={item.id}
                    autoComplete="off"
                    name={item.name}
                    onBlur={handleBlur}
                  >
                    {item.option.map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <span className="error-message">
                    {(errorMessage
                      && errorMessage[item.error]
                      && errorMessage[item.error].length > 1)
                      ? errorMessage[item.error]
                      : null}
                  </span>
                </label>
              )) : null}
            </div>
            <input type="submit" value={`Pay $${cartTotal.toFixed(2)}`} />
          </div>
        </form>

      </div>
    </div>)
}

export default Payment;