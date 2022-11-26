import React from "react";
import ItemCard from "./ItemCard";

const Store = ({ data, loading, error }) => {

  return (
    <div className="store-window">
      {!loading ? data.map((item) => (
        <ItemCard
          data={item}
          key={item.id}
        />
      )) : <div className="loading-screen">Loading...</div>}
      {error && <h3 className="error-screen text-danger">Error loading data</h3>}
    </div>
  )
}

export default Store;