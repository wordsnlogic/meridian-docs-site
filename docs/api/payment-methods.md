---
id: payment-methods
title: Payment Methods
sidebar_label: Payment Methods
description: API reference for PaymentMethod objects in Meridian.
---

# Payment Methods

A **PaymentMethod** represents a customer's payment instrument — a credit card, debit card, bank account, wallet, or other payment type. PaymentMethods are reusable and can be attached to multiple Customers.

## The PaymentMethod object

```json
{
  "id": "pm_1NqX2B4eHqLMHCmDAbc",
  "object": "payment_method",
  "type": "card",
  "card": {
    "brand": "visa",
    "last4": "4242",
    "exp_month": 12,
    "exp_year": 2027,
    "fingerprint": "Xt5EWLLDS7FJjR1c",
    "funding": "credit",
    "country": "US"
  },
  "customer": "cus_Nk3mHXq7ViGwMz",
  "created": 1748476800,
  "livemode": false
}
```

## Create a PaymentMethod

<span className="badge--post">POST</span> `/v1/payment_methods`

```bash
curl https://api.meridian.dev/v1/payment_methods \
  -u sk_test_4eC39HqL...: \
  -d type=card \
  -d "card[number]"=4242424242424242 \
  -d "card[exp_month]"=12 \
  -d "card[exp_year]"=2027 \
  -d "card[cvc]"=123
```

:::tip
In production, always use Meridian.js to tokenize card data client-side. Never send raw card numbers to your server.
:::

## Retrieve a PaymentMethod

<span className="badge--get">GET</span> `/v1/payment_methods/:id`

```bash
curl https://api.meridian.dev/v1/payment_methods/pm_1NqX2B4eHqLMHCmD \
  -u sk_test_4eC39HqL...:
```

## Attach to a Customer

<span className="badge--post">POST</span> `/v1/payment_methods/:id/attach`

```bash
curl -X POST https://api.meridian.dev/v1/payment_methods/pm_1NqX2B/attach \
  -u sk_test_4eC39HqL...: \
  -d customer=cus_Nk3mHXq7ViGwMz
```

## Detach from a Customer

<span className="badge--post">POST</span> `/v1/payment_methods/:id/detach`

```bash
curl -X POST https://api.meridian.dev/v1/payment_methods/pm_1NqX2B/detach \
  -u sk_test_4eC39HqL...:
```

## List PaymentMethods for a Customer

<span className="badge--get">GET</span> `/v1/customers/:id/payment_methods`

```bash
curl "https://api.meridian.dev/v1/customers/cus_Nk3mHXq7ViGwMz/payment_methods?type=card" \
  -u sk_test_4eC39HqL...:
```
