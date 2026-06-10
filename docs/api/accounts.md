---
id: accounts
title: Accounts
sidebar_label: Accounts
description: API reference for Connect Account objects in Meridian.
---

# Accounts API

**Connect Accounts** let you build platforms and marketplaces where other businesses or individuals accept payments. Your platform creates and manages connected accounts on behalf of your users.

## Account types

| Type | Description |
|---|---|
| `standard` | Full Meridian account. User onboards directly with Meridian. |
| `express` | Streamlined onboarding hosted by Meridian. Platform has limited management. |
| `custom` | Platform has full control. No Meridian-hosted UI for the user. |

## Create an Account

<span className="badge--post">POST</span> `/v1/accounts`

```bash
curl https://api.meridian.dev/v1/accounts \
  -u sk_test_4eC39HqL...: \
  -d type=express \
  -d country=US \
  -d email=business@example.com \
  -d "capabilities[card_payments][requested]"=true \
  -d "capabilities[transfers][requested]"=true
```

## Create an Account Link (onboarding)

Generate a URL to send the user to Meridian's onboarding flow:

```javascript
const accountLink = await meridian.accountLinks.create({
  account: 'acct_AccountId',
  refresh_url: 'https://yourplatform.com/reauth',
  return_url: 'https://yourplatform.com/return',
  type: 'account_onboarding',
});

// Redirect the user to accountLink.url
```

## Retrieve an Account

<span className="badge--get">GET</span> `/v1/accounts/:id`

```bash
curl https://api.meridian.dev/v1/accounts/acct_AccountId \
  -u sk_test_4eC39HqL...:
```

## Check onboarding status

```javascript
const account = await meridian.accounts.retrieve('acct_AccountId');

if (account.charges_enabled && account.payouts_enabled) {
  console.log('Account is fully onboarded');
} else {
  console.log('Pending requirements:', account.requirements.currently_due);
}
```
