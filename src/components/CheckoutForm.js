import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

const CheckoutForm = ({ cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const total = location.state?.total || "0.00";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      // Handle the error, e.g., show an error message to the user
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Handle the result of the payment
      setMessage("Payment status" + paymentIntent.status);
    } else {
      setMessage("Unexpected state");
    }

    setIsProcessing(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <div className="checkout-summary">
        <h2>Checkout</h2>
        <p>Total Amount: ${total}</p>
      </div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isProcessing || !stripe} id="submit">
          <span className="checkout-button">
            {isProcessing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
};

export default CheckoutForm;
