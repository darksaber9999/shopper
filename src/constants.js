export const COMMERCE_URL = "https://api.chec.io/v1/";
export const COMMERCE_API = process.env.REACT_APP_COMMERCE_API;

export const INITIAL_DISPLAY = {
  store: true,
  cart: false,
  authWindow: false,
  shipping: false,
  payment: false,
  confirm: false,
  login: true,
  signUp: false,
};

export const TEST_USER = {
  emailAddress: 'test@email.com',
  password: 'test',
  passwordConfirm: 'test',
  firstName: 'Test',
  lastName: 'User',
};