import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight, faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";


const CartItemCard = ({ data, product, toggleHiddenIcons, removeFromCart, changeQuantity }) => {

  const toggleQuantityControls = (element) => {
    toggleHiddenIcons(`caret-right-${product.id}`);
    toggleHiddenIcons(`caret-down-${product.id}`);
    element.classList.toggle('hidden');
  };

  const handleQuantityControls = (e) => toggleQuantityControls(e.target.parentElement.parentElement.children[5])

  const handleRemoveFromCart = (e) => removeFromCart(e.target.parentElement.parentElement.parentElement.dataset.item);

  const handleChangeQuantityRemove = () => changeQuantity('remove', product.id);

  const handleChangeQuantityAdd = () => changeQuantity('add', product.id);


  return (
    <>
      {data.filter((item) => item.id === product.id).map((cartItem) => (
        <div key={cartItem.id} className="cart-item" data-item={cartItem.id}>
          <FontAwesomeIcon
            icon={faCaretRight}
            onClick={handleQuantityControls}
            id={`caret-right-${cartItem.id}`}
            className="caret-right"
          />
          <FontAwesomeIcon
            icon={faCaretDown}
            onClick={handleQuantityControls}
            id={`caret-down-${cartItem.id}`}
            className={`caret-down hidden`}
          />
          <span className="cart-item-name">{cartItem.name}</span>
          <span className="cart-item-quantity">Qty: {product.quantity}</span>
          <span className="cart-item-total">${(cartItem.price * product.quantity).toFixed(2)}</span>

          <div className="cart-item-quantity-controls hidden">
            <FontAwesomeIcon icon={faXmark} onClick={handleRemoveFromCart} />
            <button className="cart-item-quantity-button" onClick={handleChangeQuantityRemove}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <button className="cart-item-quantity-button" onClick={handleChangeQuantityAdd}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default CartItemCard;