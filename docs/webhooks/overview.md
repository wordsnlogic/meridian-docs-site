---
id: overview
title: Webhooks Overview
sidebar_label: Overview
description: Receive real-time event notifications when activity occurs in your Meridian account.
---

# Webhooks

Webhooks let Meridian notify your application in real time whenever an event occurs — a payment succeeds, a subscription renews, a dispute is filed, and more.

## How webhooks work

1. You register an HTTPS endpoint URL in the Dashboard or via the API
2. Meridian sends a `POST` request to that URL whenever a matching event fires
3. Your server processes the event and returns HTTP `200`
4. If Meridian doesn't receive a `200`, it retries with exponential backoff

```
Meridian API  →  POST /your-webhook-endpoint
                  { "type": "payment_intent.succeeded", "data": { ... } }
Your Server   →  200 OK
```

## Register a webhook endpoint

### Via the Dashboard

Go to **Developers → Webhooks → Add endpoint**. Enter your HTTPS URL and select which event types to listen for.

### Via the API

```bash
curl https://api.meridian.dev/v1/webhook_endpoints \
  -u sk_test_4eC39HqL...: \
  -d url="https://yourapp.com/webhooks/meridian" \
  -d "enabled_events[]"=payment_intent.succeeded \
  -d "enabled_events[]"=customer.subscription.updated
```

## Verify webhook signatures

Every webhook includes a `Meridian-Signature` header. **Always verify this signature** before processing the event — it proves the request came from Meridian, not a third party.

```javascript
import { Meridian } from '@meridian/sdk';

const meridian = new Meridian(process.env.MERIDIAN_SECRET_KEY);
const webhookSecret = process.env.MERIDIAN_WEBHOOK_SECRET;

app.post('/webhooks/meridian', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['meridian-signature'];

  let event;
  try {
    event = meridian.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send('Webhook Error');
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      fulfillOrder(paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      notifyCustomer(event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});
```

:::danger
If you skip signature verification, anyone can send fake webhook events to your endpoint and trigger your fulfillment logic.
:::

## Respond quickly — process asynchronously

Your endpoint must return HTTP `200` within **5 seconds**. For any processing that takes longer, return `200` immediately and handle the event in a background job or queue.

```javascript
app.post('/webhooks/meridian', async (req, res) => {
  // Verify signature first
  const event = verifySignature(req);

  // Acknowledge immediately
  res.json({ received: true });

  // Then process asynchronously
  await queue.add('handle-webhook', { event });
});
```

## Retry logic

If Meridian doesn't receive `200`, it retries with exponential backoff:

| Attempt | Delay |
|---|---|
| 1st retry | 5 minutes |
| 2nd retry | 30 minutes |
| 3rd retry | 2 hours |
| 4th retry | 5 hours |
| 5th retry | 10 hours |

After 5 failed attempts, the event is marked as failed. You can manually retry failed events from the Dashboard.

:::tip New in v2.4
Meridian now supports **async webhook delivery** with automatic retry logic and dead-letter queues. See the [release notes](/changelog) for details.
:::

## Best practices

- **Make event handlers idempotent** — the same event may be delivered more than once. Use the event `id` to deduplicate.
- **Don't rely on event order** — events may arrive out of order. Always fetch the latest object state from the API.
- **Subscribe only to events you need** — this reduces noise and processing overhead.
- **Monitor your endpoint** — check the Webhook logs in the Dashboard for delivery failures.
