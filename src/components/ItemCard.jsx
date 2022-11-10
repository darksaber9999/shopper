import React from "react";

const ItemCard = ({ data }) => {
  const { name, price, quantity, image, category } = data;

  return (
    <div className="item-card">
      <img src={image.url} alt="product" className="item-image" />
      <h3 className="item-name">{name}</h3>
      <p className="item-info-wrapper">
        <span className="item-price">${price}</span>
        <span className="item-quantity">{quantity} left!</span>
      </p>
      <button>Add to Cart</button>
    </div>
  )
}

export default ItemCard;