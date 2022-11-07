import React from "react";
import Store from "../components/Store";
import Cart from "../components/Cart";
import AuthWindow from "../components/AuthWindow";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import Confirm from "../components/Confirm";
import { INITIAL_DISPLAY } from "../constants";

class ShopperWindow extends React.Component {
  state = {
    display: INITIAL_DISPLAY,
  }

  render() {
    const { display: { store, cart, authWindow, shipping, payment, confirm } } = this.state;

    return (
      <>
        <header>
          <span>Shopper</span>
          <span>Navigation</span>
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