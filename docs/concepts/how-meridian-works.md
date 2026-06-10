---
id: how-meridian-works
title: How Meridian Works
sidebar_label: How Meridian Works
description: An overview of how Meridian fits between your application and the global payment networks.
---

# How Meridian Works

Meridian is a payment infrastructure layer that sits between your application and the global financial system. When a customer pays, Meridian handles the complexity of authorization, fraud scoring, currency conversion, and settlement — so you interact with a single clean API instead of dozens of banks and card networks.

## The payment stack

```
Your Application
       ↓  API call
  Meridian API
       ↓  routes to
  Card Networks (Visa, Mastercard, Amex)
       ↓  authorizes with
  Customer's Issuing Bank
       ↓  settles to
  Your Bank Account
```

## Key components

### API
A single REST API for all payment operations — charges, subscriptions, payouts, fraud rules, reporting. Every resource follows a predictable pattern: create, retrieve, update, list.

### SDKs
Server-side libraries for Node.js, Python, Ruby, Go, Java, and PHP. All SDKs are thin wrappers over the REST API with typed responses, automatic retries, and idempotency built in.

### Meridian.js
A client-side JavaScript library that securely collects payment information in the browser. Card data goes directly from the customer's browser to Meridian's servers — it never touches your backend.

### Dashboard
A web UI for monitoring payments, managing customers, configuring webhooks, reviewing disputes, and downloading reports. Every operation available in the Dashboard is also available via the API.

### Webhooks
Real-time event notifications pushed to your server whenever something happens — a payment succeeds, a subscription renews, a dispute is opened. Webhooks are how your backend stays in sync with Meridian's state.

## Flow of a typical payment

1. Customer clicks "Pay" on your checkout page
2. Meridian.js tokenizes the card details client-side into a `PaymentMethod`
3. Your server creates a `PaymentIntent` via the API
4. Meridian.js confirms the `PaymentIntent` using the `client_secret`
5. Meridian routes the authorization request to the card network
6. The card network contacts the issuing bank
7. The issuing bank approves or declines
8. Meridian returns the result and fires a `payment_intent.succeeded` webhook
9. Your server receives the webhook and fulfills the order

## Test mode vs. live mode

Every Meridian account has two completely separate environments:

- **Test mode** — safe sandbox with test card numbers. No real money moves. All API behavior is identical.
- **Live mode** — real transactions. Requires account verification and agreement to Meridian's terms.

Switch between them by changing your API keys. Objects created in one mode are invisible in the other.
