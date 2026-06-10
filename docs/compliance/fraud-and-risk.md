---
id: fraud-and-risk
title: Fraud & Risk
sidebar_label: Fraud & Risk
description: How Meridian's machine learning fraud detection protects your business.
---

# Fraud & Risk

Meridian includes a built-in fraud detection engine called **Meridian Radar** that evaluates every payment in real time and blocks or flags suspicious activity automatically.

## How Radar works

Every charge passes through Radar before it is authorized. Radar assigns a **risk score** (0–100) based on hundreds of signals:

- Card BIN data and issuer information
- IP address, device fingerprint, and geolocation
- Velocity — how many charges have been attempted with this card, email, or device recently
- Historical fraud patterns across the Meridian network
- Your own custom rules

## Risk levels

| Risk Level | Score Range | Default action |
|---|---|---|
| Normal | 0–64 | Allow |
| Elevated | 65–84 | Allow (flagged for review) |
| Highest | 85–100 | Block |

## View risk scores

Every charge includes a `risk_score` and `risk_level` field:

```json
{
  "id": "ch_ChargeId",
  "object": "charge",
  "outcome": {
    "risk_level": "normal",
    "risk_score": 14,
    "type": "authorized",
    "reason": "approved_by_network"
  }
}
```

## Custom rules

Write custom rules in the Dashboard under **Radar → Rules** to allow or block charges based on your business logic:

```
# Block charges from a high-risk country
block if :ip_country: = 'XX'

# Require 3D Secure for large transactions
request_3ds if :amount_in_usd: > 500

# Allow trusted customers to bypass elevated-risk checks
allow if :customer_id: in ['cus_TrustedA', 'cus_TrustedB']
```

## Radar for Fraud Teams

For higher-volume businesses, **Radar for Fraud Teams** adds:
- Custom ML models trained on your transaction history
- Manual review queues
- Risk team workflows and case management
- Enhanced dispute insights

Contact support to enable Radar for Fraud Teams.

## 3D Secure (3DS)

3D Secure is an authentication step that shifts fraud liability to the card issuer. Meridian supports 3DS 2.0 and can trigger it automatically based on Radar rules or issuer requirements.

```javascript
const paymentIntent = await meridian.paymentIntents.create({
  amount: 5000,
  currency: 'usd',
  payment_method_options: {
    card: { request_three_d_secure: 'automatic' }  // or 'any'
  },
});
```
