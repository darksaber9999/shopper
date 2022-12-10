import VISA_ICON from './assets/visa.png';
import AMERICAN_EXPRESS_ICON from './assets/amex.png';
import MASTERCARD_ICON from './assets/masterCard.png';
import DISCOVER_ICON from './assets/discover.png';

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

export const OTHER_CARDS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const AMERICAN_EXPRESS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const CARD = [
  'VISA',
  'MASTERCARD',
  'AMERICAN_EXPRESS',
  'DISCOVER'
];

export const CARD_ICON = {
  VISA: VISA_ICON,
  MASTERCARD: MASTERCARD_ICON,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS_ICON,
  DISCOVER: DISCOVER_ICON,
};