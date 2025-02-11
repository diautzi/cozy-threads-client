import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="card">
      <img className="product-image" src={product.image} alt={product.title} />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="card-description">{product.description}</div>
      </div>
      <div>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button
          className={"add-to-cart-button"}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
