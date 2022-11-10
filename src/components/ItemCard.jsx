import React from "react";

const ItemCard = ({ data }) => {
  const { name, price, quantity, description, image, category } = data;

  const newDescription = description.replace(/(<([^>]+)>)/ig, '');

  return (
    <div>
      <img src={image} alt="product" />
      <h3>{name}</h3>
      <p>{price}</p>
      {newDescription}
      <p>{quantity} left!</p>
      <p>{category}</p>
    </div>
  )
}

export default ItemCard;