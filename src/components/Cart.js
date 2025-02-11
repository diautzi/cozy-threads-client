import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FaMinus } from "react-icons/fa";

const Cart = ({ cart, removeFromCart, addToCart, subtractFromCart }) => {
  const navigate = useNavigate();

  // Get total price of cart
  const getTotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">Shopping Cart</h1>
      <Link to="/" className="">
        Continue shopping
      </Link>
      <div>
        {cart.length === 0 ? (
          <>
            <p className="empty-cart">Your cart is empty</p>
            <Link to="/" className="navbar-logo">
              Back to shopping
            </Link>
          </>
        ) : (
          <ul className="cart-grid">
            {cart.map((product) => (
              <div className="cart-item" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-image"
                />
                <div className="cart-details">
                  <h3>{product.name}</h3>
                  <p>
                    ${product.price.toFixed(2)} x {product.quantity}
                  </p>
                  <div className="cart-buttons">
                    <FaMinus
                      className="cart-button"
                      onClick={() => subtractFromCart(product, -1)}
                    />
                    <GoPlus
                      className="cart-button"
                      onClick={() => addToCart(product)}
                    />

                    <FaRegTrashAlt
                      className="cart-button"
                      onClick={() => removeFromCart(product)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-footer">
          <h3>Total: ${getTotal().toFixed(2)}</h3>
          <button
            className="add-to-cart-button"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
