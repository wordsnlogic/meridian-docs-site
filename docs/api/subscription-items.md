---
id: subscription-items
title: Subscription Items
sidebar_label: Subscription Items
description: API reference for SubscriptionItem objects in Meridian.
---

# Subscription Items API

Subscription Items represent individual line items within a subscription — each item links a Price to the subscription. A subscription can have multiple items (e.g., a base plan + add-on seats).

## The SubscriptionItem object

```json
{
  "id": "si_ItemId",
  "object": "subscription_item",
  "subscription": "sub_1NqX2B4eHqLMHCmD",
  "price": {
    "id": "price_ProMonthly",
    "unit_amount": 4900,
    "currency": "usd"
  },
  "quantity": 1,
  "created": 1748476800
}
```

## Add an item to a subscription

<span className="badge--post">POST</span> `/v1/subscription_items`

```bash
curl https://api.meridian.dev/v1/subscription_items \
  -u sk_test_4eC39HqL...: \
  -d subscription=sub_1NqX2B4e \
  -d price=price_AddonMonthly \
  -d quantity=5
```

## Update a subscription item

<span className="badge--post">POST</span> `/v1/subscription_items/:id`

Change the price or quantity:

```bash
curl https://api.meridian.dev/v1/subscription_items/si_ItemId \
  -u sk_test_4eC39HqL...: \
  -d quantity=10 \
  -d proration_behavior=create_prorations
```

## Delete a subscription item

<span className="badge--delete">DELETE</span> `/v1/subscription_items/:id`

```bash
curl -X DELETE https://api.meridian.dev/v1/subscription_items/si_ItemId \
  -u sk_test_4eC39HqL...: \
  -d proration_behavior=create_prorations
```

## List subscription items

<span className="badge--get">GET</span> `/v1/subscription_items`

```bash
curl "https://api.meridian.dev/v1/subscription_items?subscription=sub_1NqX2B4e" \
  -u sk_test_4eC39HqL...:
```
