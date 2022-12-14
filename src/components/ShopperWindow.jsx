import React from "react";
import Store from "../components/Store";
import ItemDetails from "./ItemDetails";
import Cart from "../components/Cart";
import AuthWindow from "../components/AuthWindow";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import Confirm from "../components/Confirm";
import CommerceService from "../services";
import { INITIAL_DISPLAY, TEST_USER } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faArrowRightToBracket, faSort, faMagnifyingGlass, faXmark, faArrowUpAZ, faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";
import { cardNumberValidation, checkForDuplicateUser, onlyNumbersValidation, onlyTextValidation, passwordMatchValidation, securityCodeValidation } from "../validations";

const commerce = new CommerceService();
class ShopperWindow extends React.Component {
  state = {
    display: INITIAL_DISPLAY,
    loading: false,
    error: false,
    errorMessage: {},
    data: [],
    categories: [],
    displayedItem: '',
    currentUsers: [
      TEST_USER,
    ],
    userLoggedIn: false,
    userCart: new Map(),
    cardType: '',
    shippingInfo: {},
    paymentInfo: {},
    searchTerm: '',
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

  toggleHiddenIcons = (elementId) => document.getElementById(elementId).classList.toggle('hidden');

  toggleSearchDisplay = () => {
    document.getElementsByClassName('header-search-wrapper')[0].classList.toggle('displayed');
    this.toggleHiddenIcons('search-icon');
    this.toggleHiddenIcons('search-icon-x');
  };

  toggleSortOptionsDisplay = () => {
    document.getElementsByClassName('header-sort-options-wrapper')[0].classList.toggle('displayed');
    this.toggleHiddenIcons('sort-icon');
    this.toggleHiddenIcons('sort-icon-x');
  };

  toggleDisplay = (name) => this.setState((prevState) => ({ display: { ...prevState.display, [name]: !prevState.display[name] } }));

  toggleItemDetails = () => this.toggleDisplay('itemDetails');

  toggleCart = () => this.toggleDisplay('cart');

  toggleAuthWindow = () => this.toggleDisplay('authWindow');

  toggleShippingWindow = () => this.toggleDisplay('shipping');

  togglePaymentWindow = () => this.toggleDisplay('payment');

  toggleConfirmWindow = () => this.toggleDisplay('confirm');

  setDisplayedItem = (item) => this.setState((prevState) => ({
    displayedItem: item,
  }));

  getItemList = () => document.getElementsByClassName('item-card');

  searchItems = (value) => {
    const itemList = this.getItemList();

    for (let item of itemList) {
      const itemCategory = item.dataset.category.toLowerCase();
      const itemName = item.dataset.item.toLowerCase()

      if (itemCategory !== value) {
        item.classList.add('hidden');
      }
      if (itemName !== value) {
        item.classList.add('hidden');
      }
      if (itemCategory.includes(value) || itemName.includes(value)) {
        item.classList.remove('hidden');
      }
      if (value === '') {
        item.classList.remove('hidden');
      }
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const newValue = value.toLowerCase();
    this.setState((prevState) => ({
      [name]: newValue,
    }));
    name === 'searchTerm' && this.searchItems(newValue);
  }

  sortCategories = (direction) => this.setState((prevState) => {
    const newArray = prevState.categories.sort((a, b) => (a.name > b.name) ? direction : ((b.name > a.name) ? -direction : 0));
    return {
      categories: newArray,
    }
  });

  sortItems = (direction) => this.setState((prevState) => {
    const newArray = prevState.data.sort((a, b) => (a.name > b.name) ? direction : ((b.name > a.name) ? -direction : 0));
    return {
      data: newArray,
    }
  });

  sortAToZ = () => {
    this.sortCategories(1);
    this.sortItems(1);
  };

  sortZToA = () => {
    this.sortCategories(-1);
    this.sortItems(-1);
  };

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

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };

    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
    }

    return '';
  };

  handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case 'emailAddressLogin':
      case 'passwordLogin':
      case 'name':
      case 'addressLine1':
      case 'addressLine2':
      case 'city':
      case 'state':
      case 'country':
      case 'shippingMethod':
      case 'expiryMonth':
      case 'expiryYear':
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
      case 'zipCode':
      case 'phoneNumber':
        errorText = onlyNumbersValidation(value.split('-').join(''));
        this.setState((prevState) => ({
          errorMessage: {
            ...prevState.errorMessage,
            [`${type}Error`]: errorText,
          },
        }));
        break;
      case 'cardNumber':
        errorText = cardNumberValidation(value);
        this.setState((prevState) => ({
          cardType: this.findDebitCardType(value),
          errorMessage: {
            ...prevState.errorMessage,
            [`${type}Error`]: errorText,
          },
        }));
        break;
      case 'cardholderName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          errorMessage: {
            ...prevState.errorMessage,
            [`${type}Error`]: errorText,
          },
        }));
        break;
      case 'securityCode':
        errorText = securityCodeValidation(3, value);
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

  addUserShippingInfo = (shippingInfo) => {
    this.setState((prevState) => ({
      ...prevState,
      shippingInfo: shippingInfo,
    }));
  }

  addUserPaymentInfo = (paymentInfo) => {
    this.setState((prevState) => ({
      ...prevState,
      paymentInfo: paymentInfo,
    }));
  }

  animateAddToCartMessage = (item, isAddSuccessful) => {
    for (const button of document.getElementsByClassName('add-to-cart-button')) {
      if (button.dataset.product === item) {
        button.setAttribute('disabled', true);
        button.innerHTML = isAddSuccessful ? 'Item Added' : 'Unable to Add Item';
        button.style.color = isAddSuccessful ? 'green' : 'red';
        setTimeout(() => {
          button.style.color = 'black';
          button.innerHTML = 'Add to Cart'
          button.removeAttribute('disabled');
        }, 1000);
      }
    }
  };

  isItemQuantityAvailable = (targetId) => {
    const currentlyInCart = this.state.userCart.has(targetId) ? this.state.userCart.get(targetId) : 0;
    const availableQuantity = this.state.data.filter((item) => item.id === targetId)[0].quantity;
    if (availableQuantity - currentlyInCart > 0) {
      return true;
    }
    return false;
  };

  addToCart = (item) => this.setState((prevState) => {
    this.animateAddToCartMessage(item, this.isItemQuantityAvailable(item));
    if (this.isItemQuantityAvailable(item)) {
      const tempQuantity = (prevState.userCart.has(item) ? (prevState.userCart.get(item) + 1) : 1);
      return {
        userCart: prevState.userCart.set(item, tempQuantity),
      }
    }
  });

  removeFromCart = (item) => this.setState((prevState) => {
    prevState.userCart.delete(item);
    return {
      userCart: prevState.userCart,
    }
  });

  changeQuantity = (method, item) => this.setState((prevState) => {
    const tempQuantity = (method === 'add') ? prevState.userCart.get(item) + 1 : prevState.userCart.get(item) - 1;
    if (tempQuantity === 0) {
      prevState.userCart.delete(item);
    }
    return {
      userCart: (tempQuantity === 0) ?
        prevState.userCart :
        prevState.userCart.set(item, tempQuantity),
    }
  });

  clearCart = () => this.setState((prevState) => ({ userCart: new Map() }));

  getCartQuantity = () => {
    let total = 0;
    this.state.userCart.forEach((value) => total += value);
    return total;
  };

  setHeaderCartQuantity = () => document.getElementById('cart-quantity').innerHTML = this.getCartQuantity();

  getCartTotal = () => {
    let total = 0;
    this.state.userCart.forEach((value, key) => {
      total += Number(this.state.data.filter((item) => item.id === key)[0].price) * value;
    });
    return total;
  };

  disableCheckoutButton = () => {
    if (this.state.display.cart && this.state.userCart.size === 0) {
      document.getElementById('checkout-button').setAttribute('disabled', true);
    }
  };

  componentDidUpdate = () => {
    this.setHeaderCartQuantity();
    this.disableCheckoutButton();
  };

  render() {
    const { display: { store, itemDetails, cart, authWindow, shipping, payment, confirm, login, signUp }, loading, error, errorMessage, data, categories, displayedItem, currentUsers, userLoggedIn, userCart, cardType, searchTerm } = this.state;

    return (
      <>
        <header>
          <span>Shopper</span>
          <span className="header-search-button">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              id="search-icon"
              onClick={this.toggleSearchDisplay}
            />
            <FontAwesomeIcon
              icon={faXmark}
              id="search-icon-x"
              className="hidden"
              onClick={this.toggleSearchDisplay}
            />
            <span className="header-search-wrapper">
              <input
                type="text"
                name="searchTerm"
                id="searchTerm"
                placeholder="Item Search..."
                value={searchTerm}
                onChange={this.handleChange}
              />
            </span>
          </span>
          <span className="header-sort-button">
            <FontAwesomeIcon
              icon={faSort}
              id="sort-icon"
              onClick={this.toggleSortOptionsDisplay}
            />
            <FontAwesomeIcon
              icon={faXmark}
              id="sort-icon-x"
              className="hidden"
              onClick={this.toggleSortOptionsDisplay}
            />
            <span className="header-sort-options-wrapper">
              <button onClick={this.sortAToZ}>
                <FontAwesomeIcon icon={faArrowUpAZ} />
              </button>
              <button onClick={this.sortZToA}>
                <FontAwesomeIcon icon={faArrowDownAZ} />
              </button>
            </span>
          </span>
          <span className="header-auth-button" onClick={this.toggleAuthWindow}>
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
            />
          </span>
          <span className="header-cart-button" onClick={this.toggleCart}>
            <FontAwesomeIcon
              icon={faShoppingCart}
            />
            <span id="cart-quantity">0</span>
          </span>
        </header>
        <div className="component-window">
          {store ?
            <Store
              loading={loading}
              data={data}
              error={error}
              categories={categories}
              userCart={userCart}
              toggleItemDetails={this.toggleItemDetails}
              setDisplayedItem={this.setDisplayedItem}
              addToCart={this.addToCart}
            />
            : null}
          {itemDetails ?
            <ItemDetails
              data={data}
              displayedItem={displayedItem}
              userCart={userCart}
              toggleItemDetails={this.toggleItemDetails}
              addToCart={this.addToCart}
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
            <Shipping
              errorMessage={errorMessage}
              toggleShippingWindow={this.toggleShippingWindow}
              togglePaymentWindow={this.togglePaymentWindow}
              createEventArray={this.createEventArray}
              createEventObject={this.createEventObject}
              handleValidations={this.handleValidations}
              addUserShippingInfo={this.addUserShippingInfo}
            />
            : null}
          {payment ?
            <Payment
              errorMessage={errorMessage}
              cardType={cardType}
              togglePaymentWindow={this.togglePaymentWindow}
              toggleConfirmWindow={this.toggleConfirmWindow}
              createEventArray={this.createEventArray}
              createEventObject={this.createEventObject}
              handleValidations={this.handleValidations}
              addUserPaymentInfo={this.addUserPaymentInfo}
              getCartTotal={this.getCartTotal}
            />
            : null}
          {confirm ?
            <Confirm
              toggleConfirmWindow={this.toggleConfirmWindow}
              clearCart={this.clearCart}
            />
            : null}
          {cart ?
            <Cart
              data={data}
              userCart={userCart}
              toggleHiddenIcons={this.toggleHiddenIcons}
              toggleCart={this.toggleCart}
              toggleShippingWindow={this.toggleShippingWindow}
              isItemQuantityAvailable={this.isItemQuantityAvailable}
              removeFromCart={this.removeFromCart}
              changeQuantity={this.changeQuantity}
              clearCart={this.clearCart}
              getCartQuantity={this.getCartQuantity}
              getCartTotal={this.getCartTotal}
            />
            : null}
        </div>
      </>
    )
  };
}

export default ShopperWindow;