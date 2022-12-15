import React from "react";
import { isEmpty } from "../validations";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ItemCard = ({ data, toggleItemDetails, setDisplayedItem, addToCart }) => {
  const { name, price, quantity, image, category, id } = data;
  const stringID = `${category.toLowerCase()}-${name.toLowerCase()}-info`;

  const toggleItemInfoDisplay = (e) => {
    setDisplayedItem(id);
    if (!isEmpty(e.target.dataset)) {
      e.type === 'mouseenter' ?
        document.getElementById(`${e.target.dataset.category.toLowerCase()}-${e.target.dataset.item.toLowerCase()}-info`).classList.add('displayed') :
        document.getElementById(`${e.target.dataset.category.toLowerCase()}-${e.target.dataset.item.toLowerCase()}-info`).classList.remove('displayed');
    }
  }

  const toggleAddToCart = (e) => addToCart(e.target.dataset.product);

  return (
    <div
      className="item-card"
      data-category={category}
      data-item={name}
      onMouseEnter={toggleItemInfoDisplay}
      onMouseLeave={toggleItemInfoDisplay}
    >
      <img
        src={image.url}
        alt="product"
        className="item-image"
        data-category={category}
        data-item={name}
      />
      <div
        id={stringID}
        className="item-info-wrapper"
        data-category={category}
        data-item={name}
      >
        <h3
          className="item-name"
          data-category={category}
          data-item={name}
        >{name}</h3>
        <p
          className="item-transaction-info-wrapper"
          data-category={category}
          data-item={name}
        >
          <span className="item-price">${price}</span>
          <span className="item-quantity">{quantity} left!</span>
        </p>
        <button
          className="add-to-cart-button"
          data-category={category}
          data-item={name}
          data-product={id}
          onClick={toggleAddToCart}
        >Add to Cart</button>
        <FontAwesomeIcon
          icon={faCircleInfo}
          className="item-info-icon"
          onClick={toggleItemDetails}
        />
      </div>
    </div >
  )
}

export default ItemCard;