---
id: verify-signatures
title: Verify Webhook Signatures
sidebar_label: Verify Signatures
description: How to verify Meridian webhook signatures to ensure events are authentic.
---

# Verify Webhook Signatures

Every webhook request Meridian sends includes a `Meridian-Signature` header. Verifying this signature confirms the request came from Meridian — not a third party trying to spoof events.

## How signatures work

Meridian signs every webhook payload using HMAC-SHA256 with your endpoint's signing secret. The `Meridian-Signature` header contains:
- A timestamp (`t=...`) — prevents replay attacks
- The signature (`v1=...`) — HMAC of `timestamp.payload`

```
Meridian-Signature: t=1748476800,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a05bd539baef034910be1c3
```

## Verify using the SDK

The SDK handles parsing and verification for you:

```javascript
const express = require('express');
const app = express();

// Use raw body parser — the signature is computed on the raw bytes
app.post('/webhooks/meridian',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['meridian-signature'];
    const webhookSecret = process.env.MERIDIAN_WEBHOOK_SECRET;

    let event;
    try {
      event = meridian.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('Signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Signature is valid — process the event
    console.log('Verified event:', event.type);
    res.json({ received: true });
  }
);
```

:::danger
Use `express.raw()` (not `express.json()`) before the webhook route. If the body is parsed before signature verification, the raw bytes change and verification will fail.
:::

## Verify manually

If you're not using an SDK, here's the algorithm:

```python
import hmac, hashlib, time

def verify_signature(payload_body, sig_header, secret):
    parts = dict(item.split("=", 1) for item in sig_header.split(","))
    timestamp = parts["t"]
    received_sig = parts["v1"]

    # Reject if timestamp is older than 5 minutes
    if abs(time.time() - int(timestamp)) > 300:
        raise ValueError("Timestamp too old")

    signed_payload = f"{timestamp}.{payload_body.decode('utf-8')}"
    expected = hmac.new(
        secret.encode(), signed_payload.encode(), hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(expected, received_sig):
        raise ValueError("Invalid signature")
```

## Tolerance window

By default, the SDK rejects requests with timestamps older than 5 minutes. You can adjust this:

```javascript
event = meridian.webhooks.constructEvent(
  payload, sig, secret,
  600  // 10-minute tolerance window
);
```
