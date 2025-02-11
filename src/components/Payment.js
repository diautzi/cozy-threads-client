import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { serverUrl } from "../api/apiUrl";

const Payment = ({ cart, stripePromise }) => {
  const [clientSecret, setClientSecret] = useState("");

  // Fetch client secret for the checkout session when the app loads
  useEffect(() => {
    // Assuming you have an endpoint to create a payment intent
    fetch(`${serverUrl}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error("Error:", error));
  }, [cart]);

  // custom appearance settings for the Stripe Checkout
  const appearance = {
    theme: "stripe",
  };

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance }}
          key={clientSecret} // Forces remount when clientSecret changes
        >
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
