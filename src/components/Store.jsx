import React from "react";
import CommerceService from "../services";

const Store = () => {

  const commerce = new CommerceService();
  commerce.fetchProducts();

  return (
    <div className="store-window">
      <span>Store</span>
    </div>
  )
}

export default Store;