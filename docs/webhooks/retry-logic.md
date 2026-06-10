---
id: retry-logic
title: Retry Logic
sidebar_label: Retry Logic
description: How Meridian retries failed webhook deliveries and how to handle dead-lettered events.
---

# Webhook Retry Logic

If Meridian doesn't receive an HTTP `200` response from your endpoint within 5 seconds, it marks the delivery as failed and retries with exponential backoff.

## Retry schedule

| Attempt | Delay after previous attempt |
|---|---|
| 1st retry | 5 minutes |
| 2nd retry | 30 minutes |
| 3rd retry | 2 hours |
| 4th retry | 5 hours |
| 5th retry | 10 hours |
| Failed | Event moved to dead-letter queue |

After 5 failed attempts (covering roughly 17 hours), the event is placed in the **dead-letter queue**.

## Dead-letter queue

:::tip New in v2.4
Failed events are now preserved in a dead-letter queue instead of being silently dropped.
:::

You can inspect and replay dead-lettered events from the Dashboard (**Developers → Webhooks → Dead Letter Queue**) or via the API:

```bash
# List dead-lettered events
curl https://api.meridian.dev/v1/webhook_endpoints/we_EndpointId/dead_letter \
  -u sk_test_4eC39HqL...:

# Replay a single event
curl -X POST \
  https://api.meridian.dev/v1/webhook_endpoints/we_EndpointId/dead_letter/evt_EventId/replay \
  -u sk_test_4eC39HqL...:
```

## Respond immediately, process async

The 5-second response window is tight. If your handler does any significant work (database writes, external API calls), respond `200` immediately and process the event in a background queue:

```javascript
app.post('/webhooks/meridian', express.raw({ type: 'application/json' }), (req, res) => {
  const event = verifyAndParseEvent(req);

  // Acknowledge immediately so Meridian doesn't retry
  res.json({ received: true });

  // Process in background
  jobQueue.add('process-webhook', { eventId: event.id, eventType: event.type });
});
```

## Handle duplicate deliveries

An event may be delivered more than once (e.g., if your server acknowledged after the 5-second window). Always make your handlers **idempotent** — use the event `id` to deduplicate:

```javascript
async function handlePaymentSucceeded(event) {
  const alreadyProcessed = await db.webhookEvents.findOne({ eventId: event.id });
  if (alreadyProcessed) return;  // skip duplicate

  await db.webhookEvents.insert({ eventId: event.id, processedAt: new Date() });
  await fulfillOrder(event.data.object);
}
```

## Manually retry from the Dashboard

You can trigger a retry for any failed event from **Developers → Webhooks → [your endpoint] → Event log**. Click the event and select **Resend**.
