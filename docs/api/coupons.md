---
id: coupons
title: Coupons
sidebar_label: Coupons
description: API reference for Coupon objects in Meridian.
---

# Coupons API

Coupons create discounts that can be applied to subscriptions or invoices — either as a percentage off or a fixed amount off.

## The Coupon object

```json
{
  "id": "LAUNCH50",
  "object": "coupon",
  "name": "50% off for 3 months",
  "percent_off": 50,
  "duration": "repeating",
  "duration_in_months": 3,
  "max_redemptions": 100,
  "times_redeemed": 12,
  "valid": true,
  "created": 1748476800
}
```

## Create a Coupon

<span className="badge--post">POST</span> `/v1/coupons`

| Parameter | Type | Description |
|---|---|---|
| `percent_off` | decimal | Percentage discount (e.g., `50` = 50%). Mutually exclusive with `amount_off`. |
| `amount_off` | integer | Fixed discount in cents. Mutually exclusive with `percent_off`. |
| `currency` | string | Required if using `amount_off`. |
| `duration` | string | `forever`, `once`, or `repeating`. |
| `duration_in_months` | integer | Required if `duration=repeating`. |
| `max_redemptions` | integer | Maximum number of times this coupon can be used. |
| `id` | string | Custom coupon code (e.g., `LAUNCH50`). |

```bash
# 25% off forever
curl https://api.meridian.dev/v1/coupons \
  -u sk_test_4eC39HqL...: \
  -d id=EARLYBIRD25 \
  -d percent_off=25 \
  -d duration=forever

# $10 off first month
curl https://api.meridian.dev/v1/coupons \
  -u sk_test_4eC39HqL...: \
  -d amount_off=1000 \
  -d currency=usd \
  -d duration=once
```

## Apply a coupon to a subscription

```javascript
await meridian.subscriptions.create({
  customer: 'cus_Nk3mHXq7ViGwMz',
  items: [{ price: 'price_ProMonthly' }],
  coupon: 'EARLYBIRD25',
});
```

## Delete a Coupon

<span className="badge--delete">DELETE</span> `/v1/coupons/:id`

Deleting a coupon prevents future redemptions but does not affect existing subscriptions already using it.
