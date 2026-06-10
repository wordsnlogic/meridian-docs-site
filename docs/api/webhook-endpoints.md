---
id: webhook-endpoints
title: Webhook Endpoints
sidebar_label: Webhook Endpoints
description: API reference for managing webhook endpoints in Meridian.
---

# Webhook Endpoints API

See the [Register a Webhook Endpoint](/docs/webhooks/register-endpoint) guide for a setup walkthrough.

## Create a Webhook Endpoint

<span className="badge--post">POST</span> `/v1/webhook_endpoints`

| Parameter | Type | Description |
|---|---|---|
| `url` <span className="param-required">required</span> | string | Your HTTPS endpoint URL. |
| `enabled_events` <span className="param-required">required</span> | array | List of event types (or `["*"]` for all events). |
| `description` | string | Internal label for this endpoint. |

```bash
curl https://api.meridian.dev/v1/webhook_endpoints \
  -u sk_test_4eC39HqL...: \
  -d url="https://yourapp.com/webhooks/meridian" \
  -d "enabled_events[]"=payment_intent.succeeded \
  -d "enabled_events[]"=invoice.paid \
  -d description="Production payment events"
```

The response includes a `secret` field — store it immediately as it is shown only once.

## Retrieve a Webhook Endpoint

<span className="badge--get">GET</span> `/v1/webhook_endpoints/:id`

## Update a Webhook Endpoint

<span className="badge--post">POST</span> `/v1/webhook_endpoints/:id`

```bash
curl https://api.meridian.dev/v1/webhook_endpoints/we_EndpointId \
  -u sk_test_4eC39HqL...: \
  -d "enabled_events[]"=payment_intent.succeeded \
  -d "enabled_events[]"=charge.dispute.created
```

## Delete a Webhook Endpoint

<span className="badge--delete">DELETE</span> `/v1/webhook_endpoints/:id`

## List Webhook Endpoints

<span className="badge--get">GET</span> `/v1/webhook_endpoints`
