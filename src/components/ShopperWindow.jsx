import React from "react";
import Store from "../components/Store";
import Cart from "../components/Cart";
import AuthWindow from "../components/AuthWindow";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import Confirm from "../components/Confirm";

class ShopperWindow extends React.Component {


  render() {

    return (
      <>
        <span>This is the ShopperWindow</span>
        <Store />
        <Cart />
        <AuthWindow />
        <Shipping />
        <Payment />
        <Confirm />
      </>
    )
  }
}

export default ShopperWindow;