// App.js
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Navbar from "./Navbar";
import Payment from "./Payment";
import CompletionPage from "./CompletionPage";
import ProductCard from "./ProductCard";

const Main = ({ stripePromise, products }) => {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const hideCartOnRoutes = ["/checkout", "/cart"];

  const addToCart = (product, quantity = 1) => {
    // Create a copy of the products array
    const updatedProducts = [...products];

    // Find the product in the products array
    const productIndex = updatedProducts.findIndex(
      (item) => item.id === product.id
    );

    if (productIndex !== -1) {
      // Create a copy of the cart
      const updatedCart = [...cart];

      // Find the product in the cart
      const cartItemIndex = updatedCart.findIndex(
        (item) => item.id === product.id
      );

      // If the product already exists in the cart, update its quantity
      if (cartItemIndex !== -1) {
        updatedCart[cartItemIndex].quantity += quantity;
      } else {
        // If the product doesn't exist in the cart, add it with the quantity
        updatedCart.push({ ...product, quantity });
      }

      // Update the cart state
      setCart(updatedCart);
    }
  };

  const subtractFromCart = (product) => {
    setCart((prevCartItems) => {
      return prevCartItems.reduce((updatedCart, item) => {
        if (item.id === product.id) {
          if (item.quantity > 1) {
            // Decrease quantity by 1
            updatedCart.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          updatedCart.push(item);
        }
        return updatedCart;
      }, []);
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== product.id)
    );
  };

  return (
    <div className="App">
      <Navbar
        cart={!hideCartOnRoutes.includes(location.pathname) ? cart : null}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              products={products}
              addToCart={addToCart}
              cart={cart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              subtractFromCart={subtractFromCart}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductCard
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              subtractFromCart={subtractFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Payment cart={cart} stripePromise={stripePromise} />}
        />
        <Route
          path="/completion"
          element={<CompletionPage stripePromise={stripePromise} />}
        />
      </Routes>
    </div>
  );
};

export default Main;
