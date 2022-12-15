import React from "react";

const ItemDetails = ({ data, displayedItem, toggleItemDetails }) => {

  const clickToCloseItemDetails = (e) => {
    if (e.target.classList.contains('item-pane')) {
      e.target.children[0].addEventListener('animationend', () => toggleItemDetails());
      e.target.children[0].classList.remove('animate__zoomIn');
      e.target.children[0].classList.add('animate__zoomOut');
      e.target.children[0].removeEventListener('animationend', () => toggleItemDetails());
    }
  }

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
              <div>{currentItem.price}</div>
              <div>{currentItem.quantity}</div>
              <div>{currentItem.category}</div>
              <div>{currentItem.id}</div>
              <div>{currentItem.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemDetails;