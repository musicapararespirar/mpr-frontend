import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const CheckOutForm = ( {amount} ) => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/api/payment/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({item: amount })
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

      const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (

        <form className="payment-form" id="payment-form" onSubmit={handleSubmit}>

        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <button
            disabled={processing || disabled || succeeded}
            id="submit"
        >
            <span id="button-text">
            {processing ? (
                <div className="spinner" id="spinner"></div>
            ) : (
                `Pay ${parseInt(amount/100).toLocaleString('en-US', { style: 'currency', currency: 'USD',})} now`
            )}
            </span>
        </button>

        {/* Show any error that happens when processing the payment */}
        {error && (
            <div className="card-error" role="alert">
            {error}
            </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded, see the result in your
            <a
            href={`https://dashboard.stripe.com/test/payments`}
            >
            {" "}
            Stripe dashboard.
            </a> Refresh the page to pay again.
        </p>
        </form>
  );
}

export default CheckOutForm;
