const express = require('express');
const router = express.Router();
const config = require('config');
const stripekey = config.get('stripe');
const stripe = require('stripe')(stripekey);

const calculateOrderAmount = item => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log(item);
    if (item === "small-donation") {
    return 500}
    else {return 1000}
};

router.post("/create-payment-intent", async (req, res) => {
  const { item } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(item),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

module.exports = router;
