import React from "react";
import Store from "../components/Store";
import Cart from "../components/Cart";
import AuthWindow from "../components/AuthWindow";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import Confirm from "../components/Confirm";
import { INITIAL_DISPLAY } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


class ShopperWindow extends React.Component {
  state = {
    display: INITIAL_DISPLAY,
  }

  toggleDisplay = (name) => this.setState((prevState) => ({ display: { ...prevState.display, [name]: !prevState.display[name] } }));

  toggleCart = () => this.toggleDisplay('cart');

  render() {
    const { display: { store, cart, authWindow, shipping, payment, confirm } } = this.state;

    return (
      <>
        <header>
          <span>Shopper</span>
          <span>
            <FontAwesomeIcon
              icon={faShoppingCart}
              onClick={this.toggleCart}
            />
          </span>
        </header>
        <div className="component-window">
          {store ?
            <Store />
            : null}
          {authWindow ?
            <AuthWindow />
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
            <Cart />
            : null}
        </div>
      </>
    )
  }
}

export default ShopperWindow;