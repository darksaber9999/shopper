export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      return undefined;
    } else {
      return 'Alphabetical letters only';
    }
  } else {
    return undefined;
  }
};

export const onlyNumbersValidation = (value) => {
  if (value) {
    if (/^[0-9]*$/i.test(value)) {
      return undefined;
    } else {
      return 'Numbers only';
    }
  } else {
    return undefined;
  }
};

export const checkErrorBeforeSave = (array) => {
  let errorValue = {};

  array.forEach((field) => {
    if (!Object.values(field).toString().length) {
      errorValue = { ...errorValue, [`${Object.keys(field).toString().replace('Confirm', '')}Error`]: 'Required', };
    }
  });

  return errorValue;
};

export const checkForDuplicateUser = (value, userArray) => {
  let isDuplicate = false;

  userArray.forEach((user) => {
    if (user.emailAddress === value) {
      isDuplicate = true;
    }
  });

  return isDuplicate ? 'There is already a user with this email address' : undefined;
}

export const passwordMatchValidation = (password1, password2) => (password1 !== password2) ? 'Passwords must match' : undefined;

export const cardNumberValidation = (cardNumber) => {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
  };

  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
      if (cardNumber) {
        return cardNumber && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNumber.replace(/[^\d]/g, '').trim())
          ? undefined
          : 'Enter a valid Card';
      }
    }
  }

  return 'Enter a valid Card';
};

export const securityCodeValidation = (min, value) => (value && value.length < min) ? 'Must be 3 characters or more' : undefined;