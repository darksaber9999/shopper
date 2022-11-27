import React from "react";
import Store from "../components/Store";
import Cart from "../components/Cart";
import AuthWindow from "../components/AuthWindow";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import Confirm from "../components/Confirm";
import CommerceService from "../services";
import { INITIAL_DISPLAY } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const commerce = new CommerceService();
class ShopperWindow extends React.Component {
  state = {
    display: INITIAL_DISPLAY,
    loading: false,
    error: false,
    data: [],
    categories: [],
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
  }

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
  }

  componentDidMount() {
    this.setProductData();
    this.setCategoryData();
  }

  toggleDisplay = (name) => this.setState((prevState) => ({ display: { ...prevState.display, [name]: !prevState.display[name] } }));

  toggleCart = () => this.toggleDisplay('cart');

  render() {
    const { display: { store, cart, authWindow, shipping, payment, confirm }, loading, error, data, categories } = this.state;

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
            <Store
              loading={loading}
              data={data}
              error={error}
              categories={categories}
            />
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