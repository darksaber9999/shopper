import React from "react";

const ItemCard = ({ data }) => {
  const { name, price, quantity, image, category } = data;
  const id = `${category.toLowerCase()}-${name.toLowerCase()}-info`;

  const toggleItemInfoDisplay = (e) => {
    e.type === 'mouseenter' ?
      document.getElementById(`${e.target.dataset.category.toLowerCase()}-${e.target.dataset.item.toLowerCase()}-info`).classList.add('displayed') :
      document.getElementById(`${e.target.dataset.category.toLowerCase()}-${e.target.dataset.item.toLowerCase()}-info`).classList.remove('displayed');
  }

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
        id={id}
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
        <button data-category={category} data-item={name}>Add to Cart</button>
      </div>
    </div >
  )
}

export default ItemCard;