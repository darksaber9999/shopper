import React from "react";
import ItemCard from "./ItemCard";

const Store = ({ data, loading, error }) => {

  return (
    <div className="store-window">
      {!loading ? data.map((item) => (
        <ItemCard
          data={item}
        //key={item.dt}
        />
      )) : <div>Loading...</div>}
      {error && <h3 className="text-danger">Error loading data</h3>}
    </div>
  )
}

export default Store;