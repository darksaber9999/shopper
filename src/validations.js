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