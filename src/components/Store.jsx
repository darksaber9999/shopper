import React from "react";
import CategoryRow from "./CategoryRow";

const Store = ({ data, loading, error, categories, userCart, toggleItemDetails, setDisplayedItem, addToCart }) => {

  return (
    <div className="store-window">
      {!loading ? categories.filter((cat) => cat.numProducts > 0).map((item) => (
        <CategoryRow
          category={item.name}
          key={item.id}
          data={data}
          userCart={userCart}
          toggleItemDetails={toggleItemDetails}
          setDisplayedItem={setDisplayedItem}
          addToCart={addToCart}
        />
      )) : <div className="loading-screen">Loading...</div>}
      {error && <h3 className="error-screen text-danger">Error loading data</h3>}
    </div>
  )
}

export default Store;