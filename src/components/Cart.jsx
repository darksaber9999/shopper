import React from "react";

const Cart = ({ toggleCart }) => {

  const clickToCloseCartWindow = (e) => {
    if (e.target.classList.contains('cart-pane')) {
      e.target.children[0].addEventListener('animationend', () => toggleCart());
      e.target.children[0].classList.remove('animate__slideInRight');
      e.target.children[0].classList.add('animate__slideOutRight');
      e.target.children[0].removeEventListener('animationend', () => toggleCart());
    }
  }

  return (
    <div className="cart-pane" onClick={clickToCloseCartWindow}>
      <div className="cart-window animate__animated animate__slideInRight">
        <h3>Cart</h3>
        <div className="cart-display"></div>
        <button>Checkout</button>
      </div>
    </div>
  )
}

export default Cart;