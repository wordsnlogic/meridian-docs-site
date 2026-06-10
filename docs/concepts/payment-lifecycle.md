---
id: payment-lifecycle
title: Payment Lifecycle
sidebar_label: Payment Lifecycle
description: The stages a payment goes through from creation to settlement in Meridian.
---

# Payment Lifecycle

Every payment in Meridian follows a defined lifecycle, tracked by a `PaymentIntent` object. Understanding each stage helps you handle edge cases like authentication requirements, network errors, and partial captures.

## Lifecycle stages

```
created → confirmed → processing → succeeded
                   ↘             ↗
                    requires_action
                   ↓
                   canceled
```

### 1. Created (`requires_payment_method`)

A `PaymentIntent` is created on your server. No payment method is attached yet.

```javascript
const pi = await meridian.paymentIntents.create({ amount: 2000, currency: 'usd' });
// status: 'requires_payment_method'
```

### 2. Payment method attached (`requires_confirmation`)

A payment method is attached but not yet confirmed.

### 3. Confirmed (`requires_action` or `processing`)

Your frontend calls `confirmPayment()`. One of two things happens:
- **No action needed** → moves to `processing`
- **3D Secure required** → moves to `requires_action` and shows the bank's authentication challenge

### 4. Succeeded

The bank authorized the charge. Funds are reserved.

### 5. Captured

For `capture_method: 'manual'` intents, an explicit capture call moves funds from reserved to settled. For `automatic` capture (the default), this happens immediately after authorization.

### 6. Settled

Funds flow through the card network and appear in your Meridian balance, usually within 2 business days.

## Manual capture

Use manual capture when you need to authorize a card but delay collection — for example, a hotel hold or a marketplace escrow.

```javascript
// Create with manual capture
const pi = await meridian.paymentIntents.create({
  amount: 10000,
  currency: 'usd',
  capture_method: 'manual',
});

// Confirm (authorizes but does not charge)
// ... frontend confirms ...

// Capture later (within 7 days of authorization)
await meridian.paymentIntents.capture(pi.id, {
  amount_to_capture: 8500,  // capture less than authorized if needed
});
```

## Cancellations

A `PaymentIntent` can be canceled at any point before capture. If it was already confirmed, the authorization is released.

```javascript
await meridian.paymentIntents.cancel('pi_IntentId');
```

## Settlement timing

| Payment method | Authorization | Settlement |
|---|---|---|
| Visa / Mastercard | Instant | 1–2 business days |
| American Express | Instant | 1–2 business days |
| ACH Debit | Same day | 3–5 business days |
| Instant Payouts | 30 minutes | 30 minutes |
