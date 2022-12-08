import React from "react";
import Store from "../components/Store";
import Cart from "../components/Cart";
import AuthWindow from "../components/AuthWindow";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import Confirm from "../components/Confirm";
import CommerceService from "../services";
import { INITIAL_DISPLAY, TEST_USER } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { checkForDuplicateUser, onlyTextValidation, passwordMatchValidation } from "../validations";

const commerce = new CommerceService();
class ShopperWindow extends React.Component {
  state = {
    display: INITIAL_DISPLAY,
    loading: false,
    error: false,
    errorMessage: {},
    data: [],
    categories: [],
    currentUsers: [
      TEST_USER,
    ],
    userLoggedIn: false,
    userCart: new Map(),
  }

  setProductData = () => {
    this.setState({
      loading: true,
      error: false,
    });
    commerce.fetchProducts().then((res) => {
      if (res && res.response.ok) {
        this.setState({
          data: res.data,
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    }, (error) => {
      console.log(error);
      this.setState({
        loading: false,
        error: true,
        data: [],
      });
    });
  };

  setCategoryData = () => {
    this.setState({
      error: false,
    });
    commerce.fetchCategories().then((res) => {
      if (res && res.response.ok) {
        this.setState({
          categories: res.data,
        });
      }
    }, (error) => {
      console.log(error);
      this.setState({
        error: true,
        categories: [],
      });
    });
  };

  componentDidMount() {
    this.setProductData();
    this.setCategoryData();
  };

  toggleDisplay = (name) => this.setState((prevState) => ({ display: { ...prevState.display, [name]: !prevState.display[name] } }));

  toggleCart = () => this.toggleDisplay('cart');

  toggleAuthWindow = () => this.toggleDisplay('authWindow');

  createEventArray = (e) => {
    const eventArray = [];

    for (let i = 0; i < (e.target.length - 1); i++) {
      eventArray.push({ [e.target[i].name]: e.target[i].value });
    }

    return eventArray;
  };

  createEventObject = (eventArray) => {
    let newObject = {};
    eventArray.forEach((obj) => newObject = { ...newObject, ...obj });
    return newObject;
  };

  handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case 'emailAddressLogin':
      case 'passwordLogin':
        errorText = undefined;
        this.setState((prevState) => ({
          errorMessage: {
            ...prevState.errorMessage,
            [`${type}Error`]: errorText,
          },
        }));
        break;
      case 'emailAddress':
        errorText = checkForDuplicateUser(value, this.state.currentUsers);
        this.setState((prevState) => ({
          errorMessage: {
            ...prevState.errorMessage,
            [`${type}Error`]: errorText,
          },
        }));
        break;
      case 'password':
        errorText = passwordMatchValidation(value, document.getElementById('passwordConfirm').value);
        this.setState((prevState) => ({
          errorMessage: {
            ...prevState.errorMessage,
            [`${type}Error`]: errorText,
          },
        }));
        break;
      case 'passwordConfirm':
        errorText = passwordMatchValidation(value, document.getElementById('password').value);
        this.setState((prevState) => ({
          errorMessage: {
            ...prevState.errorMessage,
            [`${type.replace('Confirm', '')}Error`]: errorText,
          },
        }));
        break;
      case 'firstName':
      case 'lastName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          errorMessage: {
            ...prevState.errorMessage,
            [`${type}Error`]: errorText,
          },
        }));
        break;
      case 'requiredValues':
        this.setState((prevState) => ({
          errorMessage: {
            ...prevState.errorMessage,
            ...value,
          },
        }));
        break;
      default:
        break;
    }
  };

  addNewUser = (user) => {
    this.setState((prevState) => ({
      currentUsers: [
        ...prevState.currentUsers,
        user,
      ],
    }));
  };

  toggleUserLoggedIn = () => this.setState((prevState) => ({ userLoggedIn: !prevState.userLoggedIn }));


  render() {
    const { display: { store, cart, authWindow, shipping, payment, confirm, login, signUp }, loading, error, errorMessage, data, categories, currentUsers, userLoggedIn, userCart } = this.state;

    return (
      <>
        <header>
          <span>Shopper</span>
          <span>
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
              onClick={this.toggleAuthWindow}
            />
          </span>
          <span>
            <FontAwesomeIcon
              icon={faShoppingCart}
              onClick={this.toggleCart}
            />
          </span>
        </header>
        <div className="component-window">
          {store ?
            <Store
              loading={loading}
              data={data}
              error={error}
              categories={categories}
            />
            : null}
          {authWindow ?
            <AuthWindow
              login={login}
              signUp={signUp}
              errorMessage={errorMessage}
              currentUsers={currentUsers}
              userLoggedIn={userLoggedIn}
              toggleDisplay={this.toggleDisplay}
              toggleAuthWindow={this.toggleAuthWindow}
              createEventArray={this.createEventArray}
              createEventObject={this.createEventObject}
              handleValidations={this.handleValidations}
              addNewUser={this.addNewUser}
              toggleUserLoggedIn={this.toggleUserLoggedIn}
            />
            : null}
          {shipping ?
            <Shipping />
            : null}
          {payment ?
            <Payment />
            : null}
          {confirm ?
            <Confirm />
            : null}
          {cart ?
            <Cart
              userCart={userCart}
              toggleCart={this.toggleCart}
            />
            : null}
        </div>
      </>
    )
  };
}

export default ShopperWindow;