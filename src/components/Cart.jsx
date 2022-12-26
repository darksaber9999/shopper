import React from "react";
import CartItemCard from "./CartItemCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ data, userCart, toggleHiddenIcons, toggleCart, toggleShippingWindow, isItemQuantityAvailable, removeFromCart, changeQuantity, clearCart, getCartQuantity, getCartTotal }) => {
  const cartQuantity = getCartQuantity();
  const subTotal = getCartTotal();
  const salesTax = subTotal * .029;
  const cartTotal = subTotal + salesTax;

  const clickToCloseCartWindow = (e) => {
    if (e.target.classList.contains('cart-pane')) {
      e.target.children[0].addEventListener('animationend', () => toggleCart());
      e.target.children[0].classList.remove('animate__slideInRight');
      e.target.children[0].classList.add('animate__slideOutRight');
      e.target.children[0].removeEventListener('animationend', () => toggleCart());
    }
  }

  const createUserCartKeysArray = () => {
    const tempArray = [];
    if (!userCart.entries().next().done) {
      for (const item of userCart.entries()) {
        tempArray.push(({ id: item[0], quantity: item[1] }));
      }
    }
    return tempArray;
  }

  const handleCheckout = (e) => {
    e.target.parentElement.addEventListener('animationend', () => toggleCart());
    e.target.parentElement.classList.remove('animate__slideInRight');
    e.target.parentElement.classList.add('animate__slideOutRight');
    e.target.parentElement.removeEventListener('animationend', () => toggleCart());
    toggleShippingWindow();
  }

  return (
    <div className="cart-pane" onClick={clickToCloseCartWindow}>
      <div className="cart-window animate__animated animate__slideInRight">
        <h3 className="cart-title">Cart</h3>
        <FontAwesomeIcon
          icon={faTrash}
          className="clear-cart-icon"
          onClick={clearCart}
        />
        <div className="cart-display">
          {createUserCartKeysArray().map((item) => (
            <CartItemCard
              key={`${item.id}${item.quantity}`}
              data={data}
              product={item}
              toggleHiddenIcons={toggleHiddenIcons}
              isItemQuantityAvailable={isItemQuantityAvailable}
              removeFromCart={removeFromCart}
              changeQuantity={changeQuantity}
            />
          ))}
          <div className="cart-total-wrapper">
            <span className="total-cart-quantity">Qty: {cartQuantity}</span>
            <span className="cart-subtotal">Sub-Total: ${subTotal.toFixed(2)}</span>
            <span className="cart-tax">State Tax: ${salesTax.toFixed(2)}</span>
            <span className="cart-total">Cart Total: ${cartTotal.toFixed(2)}</span>
          </div>
        </div>
        <button id="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  )
}

export default Cart;