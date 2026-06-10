---
id: save-a-card
title: Save a Card for Later
sidebar_label: Save a Card
description: Attach a PaymentMethod to a Customer to enable one-click payments and off-session charges.
---

# Save a Card for Later

Saving a payment method lets you charge customers without them re-entering card details — useful for subscriptions, one-click checkout, and off-session charges.

## Save during a payment

The simplest approach: save the card while the customer completes their first payment.

```javascript
// Server: create a PaymentIntent with setup_future_usage
const paymentIntent = await meridian.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  customer: 'cus_Nk3mHXq7ViGwMz',
  setup_future_usage: 'off_session',  // signals intent to save
});
```

After the customer pays, the PaymentMethod is automatically attached to the Customer.

## Save without charging (SetupIntent)

To save a card without charging — for example, on a free trial signup — use a SetupIntent:

```javascript
// Server
const setupIntent = await meridian.setupIntents.create({
  customer: 'cus_Nk3mHXq7ViGwMz',
  usage: 'off_session',
});

// Return setupIntent.client_secret to the browser
```

```javascript
// Client (Meridian.js)
const { error } = await meridian.confirmSetup({
  elements,
  confirmParams: { return_url: 'https://yoursite.com/setup-complete' },
});
```

## Charge a saved card later

Once a PaymentMethod is attached to a Customer, charge it off-session:

```javascript
const paymentIntent = await meridian.paymentIntents.create({
  amount: 5000,
  currency: 'usd',
  customer: 'cus_Nk3mHXq7ViGwMz',
  payment_method: 'pm_CardId',
  off_session: true,
  confirm: true,
});
```

:::warning
Off-session charges can fail with `authentication_required` if the card's bank requires 3D Secure. Handle this by notifying the customer and creating an on-session PaymentIntent for them to authenticate.
:::

## List saved payment methods

```javascript
const paymentMethods = await meridian.customers.listPaymentMethods(
  'cus_Nk3mHXq7ViGwMz',
  { type: 'card' }
);

paymentMethods.data.forEach(pm => {
  console.log(pm.id, pm.card.brand, pm.card.last4);
});
```

## Set a default payment method

```javascript
await meridian.customers.update('cus_Nk3mHXq7ViGwMz', {
  invoice_settings: { default_payment_method: 'pm_CardId' },
});
```
