import React from "react";

const ItemDetails = ({ data, displayedItem, toggleItemDetails, addToCart }) => {

  const clickToCloseItemDetails = (e) => {
    if (e.target.classList.contains('item-pane')) {
      e.target.children[0].addEventListener('animationend', () => toggleItemDetails());
      e.target.children[0].classList.remove('animate__zoomIn');
      e.target.children[0].classList.add('animate__zoomOut');
      e.target.children[0].removeEventListener('animationend', () => toggleItemDetails());
    }
  };

  const toggleAddToCart = (e) => addToCart(e.target.dataset.product);

  return (
    <div id={`${displayedItem}-item`} className="item-pane" onClick={clickToCloseItemDetails}>
      <div className="item-window animate__animated animate__zoomIn">
        {data.filter((item) => item.id === displayedItem).map((currentItem) => (
          <div key={currentItem.id}>
            <h3>{currentItem.name}</h3>
            <div className="item-display">
              <div className="item-details-image-wrapper">
                <img
                  src={currentItem.image.url}
                  alt="product"
                  className="item-details-image"
                />
              </div>
              <div className="item-transaction-info-wrapper">
                <span className="item-price">${currentItem.price}</span>
                <span className="item-quantity">{currentItem.quantity} available!</span>
              </div>
              <div>Category: {currentItem.category}</div>
              <p>{currentItem.description.replace(/(<([^>]+)>)/ig, '')}</p>
            </div>
            <button
              className="add-to-cart-button"
              data-product={currentItem.id}
              onClick={toggleAddToCart}
            >Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemDetails;