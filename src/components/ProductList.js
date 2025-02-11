import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, addToCart, cart }) => {
  return (
    <div className="product-list">
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;
