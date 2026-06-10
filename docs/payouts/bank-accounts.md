---
id: bank-accounts
title: Bank Account Payouts
sidebar_label: Bank Accounts
description: Link a bank account to your Meridian account to receive payouts.
---

# Bank Account Payouts

Linking a bank account is required before you can receive payouts. You can add and verify bank accounts through the Dashboard or the API.

## Add a bank account

Add a bank account in the Dashboard under **Settings → Bank Accounts**, or via the API:

```bash
curl https://api.meridian.dev/v1/accounts/acct_YourAccountId/external_accounts \
  -u sk_test_4eC39HqL...: \
  -d "external_account[object]"=bank_account \
  -d "external_account[country]"=US \
  -d "external_account[currency]"=usd \
  -d "external_account[routing_number]"=110000000 \
  -d "external_account[account_number]"=000123456789
```

## Verify a bank account

For US bank accounts, Meridian verifies ownership using **micro-deposits** — two small deposits (under $1.00) sent to the account within 1–2 business days. You confirm the exact amounts in the Dashboard to complete verification.

```javascript
// After micro-deposits arrive, confirm the amounts:
await meridian.accounts.verifyExternalAccount(
  'acct_YourAccountId',
  'ba_BankAccountId',
  { amounts: [32, 45] }  // the two micro-deposit amounts in cents
);
```

## Set a default bank account

If you have multiple bank accounts, set a default for automatic payouts:

```bash
curl https://api.meridian.dev/v1/accounts/acct_YourAccountId/external_accounts/ba_BankAccountId \
  -u sk_test_4eC39HqL...: \
  -d default_for_currency=true
```

## Supported countries

Meridian supports bank account payouts in 40+ countries. Each country uses a different identifier format:

| Country | Identifier |
|---|---|
| United States | Routing number + account number |
| United Kingdom | Sort code + account number |
| European Union | IBAN |
| Australia | BSB + account number |
| Canada | Transit number + account number |

See the full list in the Dashboard under **Settings → Bank Accounts → Add account**.
