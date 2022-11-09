import React from "react";

const ItemCard = ({ data }) => {
  const { name, price, quantity, description, image, category } = data;

  return (
    <div>
      <img src={image} alt="product" />
      <h3>{name}</h3>
      <p>{price}</p>
      {description}
      <p>{quantity} left!</p>
      <p>{category}</p>
    </div>
  )
}

export default ItemCard;