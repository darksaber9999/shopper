import React from "react";
import ItemCard from "./ItemCard";

const CategoryRow = ({ category, data, userCart, toggleItemDetails, setDisplayedItem, addToCart }) => {

  return (
    <div className="category-row" data-category={category}>
      <h2>{category}</h2>
      <div className="category-item-container">
        {data.filter((item) => item.category === category).map((currentItem) => (
          <ItemCard
            data={currentItem}
            key={currentItem.id}
            userCart={userCart}
            toggleItemDetails={toggleItemDetails}
            setDisplayedItem={setDisplayedItem}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryRow;