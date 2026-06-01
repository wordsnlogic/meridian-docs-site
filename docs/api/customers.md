---
id: customers
title: Customers
sidebar_label: Customers
description: Create, retrieve, update, and delete customer objects in Meridian.
---

# Customers

Customer objects allow you to perform recurring charges and track multiple charges associated with the same customer. The API lets you create, delete, and update your customers. You can retrieve a single customer or a list of customers.

## The Customer object

```json
{
  "id": "cus_Nk3mHXq7ViGwMz",
  "object": "customer",
  "email": "priya@example.com",
  "name": "Priya Sharma",
  "description": null,
  "phone": null,
  "currency": null,
  "livemode": false,
  "metadata": {
    "user_id": "usr_8821"
  },
  "created": 1748476800
}
```

### Attributes

| Attribute | Type | Description |
|---|---|---|
| `id` | string | Unique identifier prefixed with `cus_`. |
| `object` | string | Always `"customer"`. |
| `email` | string \| null | The customer's email address. |
| `name` | string \| null | The customer's full name or business name. |
| `description` | string \| null | Arbitrary string for additional information. |
| `phone` | string \| null | Phone number in E.164 format. |
| `currency` | string \| null | Three-letter ISO 4217 currency code. Set automatically when a charge is made. |
| `metadata` | object | Key-value pairs for storing additional structured data. |
| `created` | timestamp | Unix timestamp of object creation. |
| `livemode` | boolean | `true` if live mode, `false` if test mode. |

---

## Create a customer

<span className="badge--post">POST</span> `/v1/customers`

Creates a new customer object.

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `email` <span className="param-optional">optional</span> | string | Customer's email address. Used to send receipts. |
| `name` <span className="param-optional">optional</span> | string | The customer's full name or business name. |
| `description` <span className="param-optional">optional</span> | string | Arbitrary string displayed alongside the customer in the Dashboard. |
| `phone` <span className="param-optional">optional</span> | string | Phone number in E.164 format. |
| `metadata` <span className="param-optional">optional</span> | object | Key-value pairs. Keys up to 40 characters, values up to 500 characters. |

```bash
curl https://api.meridian.dev/v1/customers \
  -u sk_test_4eC39HqL...: \
  -d email="priya@example.com" \
  -d name="Priya Sharma" \
  -d "metadata[user_id]"="usr_8821"
```

**Returns** the Customer object on success. Raises an error if the email address is already in use.

---

## Retrieve a customer

<span className="badge--get">GET</span> `/v1/customers/:id`

Retrieves the details of an existing customer.

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `id` <span className="param-required">required</span> | string | The identifier of the customer to retrieve. |

```bash
curl https://api.meridian.dev/v1/customers/cus_Nk3mHXq7ViGwMz \
  -u sk_test_4eC39HqL...:
```

**Returns** a Customer object if a valid identifier was provided. Raises a `not_found` error otherwise.

---

## Update a customer

<span className="badge--post">POST</span> `/v1/customers/:id`

Updates the specified customer. Any parameters not provided are left unchanged.

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `email` <span className="param-optional">optional</span> | string | Customer's email address. |
| `name` <span className="param-optional">optional</span> | string | Full name or business name. |
| `metadata` <span className="param-optional">optional</span> | object | Key-value pairs to update. Setting a key to `null` removes it. |

```bash
curl https://api.meridian.dev/v1/customers/cus_Nk3mHXq7ViGwMz \
  -u sk_test_4eC39HqL...: \
  -d name="Priya S. Sharma" \
  -d "metadata[plan]"="pro"
```

**Returns** the updated Customer object on success.

---

## Delete a customer

<span className="badge--delete">DELETE</span> `/v1/customers/:id`

Permanently deletes a customer. Also immediately cancels any active subscriptions.

:::danger
Deleting a customer is **irreversible**. All associated subscriptions, invoices, and payment methods will be permanently removed.
:::

```bash
curl -X DELETE \
  https://api.meridian.dev/v1/customers/cus_Nk3mHXq7ViGwMz \
  -u sk_test_4eC39HqL...:
```

**Returns:**

```json
{
  "id": "cus_Nk3mHXq7ViGwMz",
  "object": "customer",
  "deleted": true
}
```

---

## List all customers

<span className="badge--get">GET</span> `/v1/customers`

Returns a list of your customers sorted by creation date, most recent first.

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `email` <span className="param-optional">optional</span> | string | Filter by exact email address match. |
| `limit` <span className="param-optional">optional</span> | integer | Max objects to return. Between 1–100. Default: `10`. |
| `starting_after` <span className="param-optional">optional</span> | string | Cursor for pagination (customer ID to start after). |
| `ending_before` <span className="param-optional">optional</span> | string | Cursor for pagination (customer ID to end before). |

```bash
curl "https://api.meridian.dev/v1/customers?limit=3" \
  -u sk_test_4eC39HqL...:
```

**Returns** a paginated list with `data` array, `has_more` boolean, and cursor fields.

```json
{
  "object": "list",
  "data": [
    {
      "id": "cus_Nk3mHXq7ViGwMz",
      "object": "customer",
      "email": "priya@example.com"
    }
  ],
  "has_more": true,
  "url": "/v1/customers"
}
```
