import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Main from "./components/Main";

const App = () => {
  const [stripeKey, setStripeKey] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://cozy-threads-server-984c18c170ec.herokuapp.com/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setStripeKey(data.publishableKey))
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=45")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  console.log("stripeKey", stripeKey);

  const stripePromise = loadStripe(stripeKey);

  return (
    <Router>
      <Main stripePromise={stripePromise} products={products} />
    </Router>
  );
};

export default App;
