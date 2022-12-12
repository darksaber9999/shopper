import React from "react";
import ItemCard from "./ItemCard";

const CategoryRow = ({ category, data, addToCart }) => {

  return (
    <div className="category-row" data-category={category}>
      <h2>{category}</h2>
      <div className="category-item-container">
        {data.filter((item) => item.category === category).map((item) => (
          <ItemCard
            data={item}
            key={item.id}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryRow;