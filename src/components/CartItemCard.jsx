import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


const CartItemCard = ({ data, product, removeFromCart }) => {

  const handleRemoveFromCart = (e) => removeFromCart(e.target.parentElement.parentElement.dataset.item);

  return (
    <>
      {data.filter((item) => item.id === product.id).map((cartItem) => (
        <div key={cartItem.id} className="cart-item" data-item={cartItem.id}>
          <FontAwesomeIcon icon={faXmark} onClick={handleRemoveFromCart} />
          <span className="cart-item-name">{cartItem.name}</span>
          <span className="cart-item-quantity">Qty: {product.quantity}</span>
          <span className="cart-item-total">${(cartItem.price * product.quantity)}</span>
        </div>
      ))}
    </>
  )
}

export default CartItemCard;