---
id: accept-a-payment
title: Accept a Payment
sidebar_label: Accept a Payment
description: Create a PaymentIntent on your server and confirm it on your frontend to accept a one-time payment.
---

# Accept a Payment

This guide walks through the complete flow: creating a PaymentIntent on your server, passing it to your frontend, and confirming it to collect payment.

## How it works

```
Customer clicks Pay
    → Your server creates a PaymentIntent
    → Returns client_secret to the browser
    → Meridian.js confirms the payment using the secret
    → Meridian notifies your server via webhook
    → You fulfill the order
```

## Step 1 — Create a PaymentIntent on your server

Always create PaymentIntents server-side — never from the browser.

```javascript
// server.js
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  const paymentIntent = await meridian.paymentIntents.create({
    amount,           // in cents, e.g. 2000 = $20.00
    currency,         // 'usd'
    automatic_payment_methods: { enabled: true },
  });

  res.json({ clientSecret: paymentIntent.client_secret });
});
```

:::danger
Never send the full PaymentIntent object to the browser — only the `client_secret`. The full object contains sensitive server-side data.
:::

## Step 2 — Set up Meridian.js on your frontend

```html
<script src="https://js.meridian.dev/v1/"></script>
<div id="payment-element"></div>
<button id="submit">Pay now</button>
```

```javascript
// client.js
const meridian = Meridian('pk_test_yourPublishableKey');

// Fetch the client secret from your server
const { clientSecret } = await fetch('/create-payment-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 2000, currency: 'usd' }),
}).then(r => r.json());

// Mount the Payment Element (handles card, wallet, etc.)
const elements = meridian.elements({ clientSecret });
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');
```

## Step 3 — Confirm the payment

```javascript
document.getElementById('submit').addEventListener('click', async () => {
  const { error } = await meridian.confirmPayment({
    elements,
    confirmParams: {
      return_url: 'https://yoursite.com/payment-complete',
    },
  });

  if (error) {
    // Show the error to the customer
    document.getElementById('error-message').textContent = error.message;
  }
  // On success, the browser redirects to return_url
});
```

## Step 4 — Fulfill the order via webhook

Don't fulfill the order based on the redirect alone — network issues can prevent the customer from reaching your `return_url`. Use the `payment_intent.succeeded` webhook event instead:

```javascript
case 'payment_intent.succeeded':
  const paymentIntent = event.data.object;
  await fulfillOrder(paymentIntent.metadata.order_id);
  break;
```

## Test the flow

Use the test card `4242 4242 4242 4242` with any future expiry and any CVC to simulate a successful payment. See the full list in [Test Mode](/docs/test-mode).
