---
id: events
title: Events
sidebar_label: Events
description: API reference for Event objects in Meridian.
---

# Events API

Every action in your Meridian account generates an **Event** object. Events are the source of truth for webhook payloads and are stored for 30 days.

## The Event object

```json
{
  "id": "evt_1NqX2B4eHqLMHCmD",
  "object": "event",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_3NqX2B4eHqLMHCmD",
      "object": "payment_intent",
      "amount": 2000,
      "status": "succeeded"
    }
  },
  "request": {
    "id": "req_8Xn1A4qZpKvTm2",
    "idempotency_key": null
  },
  "created": 1748476800,
  "livemode": false,
  "pending_webhooks": 0
}
```

## Retrieve an Event

<span className="badge--get">GET</span> `/v1/events/:id`

```bash
curl https://api.meridian.dev/v1/events/evt_1NqX2B4eHqLMHCmD \
  -u sk_test_4eC39HqL...:
```

## List Events

<span className="badge--get">GET</span> `/v1/events`

```bash
curl "https://api.meridian.dev/v1/events?type=payment_intent.succeeded&limit=20" \
  -u sk_test_4eC39HqL...:
```

| Parameter | Type | Description |
|---|---|---|
| `type` | string | Filter by event type. |
| `created` | object | Filter by creation date range (`gte`, `lte`). |
| `limit` | integer | 1–100, default 10. |

:::tip
Use the Events API to backfill missed webhooks. If your endpoint was down, query events by type and date range and replay any you missed.
:::
