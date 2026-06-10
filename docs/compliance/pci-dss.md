---
id: pci-dss
title: PCI DSS
sidebar_label: PCI DSS
description: How Meridian handles PCI DSS compliance and what it means for your integration.
---

# PCI DSS Compliance

Meridian is certified **PCI DSS Level 1** — the highest level of compliance in the payment card industry. This certification is renewed annually by a Qualified Security Assessor (QSA).

## What this means for you

When you integrate with Meridian using Meridian.js or hosted fields, raw card numbers **never touch your servers**. The card data goes directly from the customer's browser to Meridian's servers over an encrypted connection.

This means your application is in **SAQ A** scope — the simplest PCI compliance questionnaire, with only ~14 questions instead of 250+.

## Staying out of PCI scope

To maintain SAQ A eligibility:

| Do this | Don't do this |
|---|---|
| Use Meridian.js or hosted payment elements | Build your own card input form and post to your server |
| Accept card data client-side via Meridian's SDK | Accept card numbers directly in your API |
| Store only the `payment_method` token | Store raw card numbers, CVCs, or full PANs |

:::danger
If you ever log, store, or transmit raw card numbers (even accidentally), you must notify Meridian and a QSA immediately. Log scrubbing and network inspection tools should be in place.
:::

## HTTPS requirement

All pages that display payment forms or transmit cardholder data must be served over **HTTPS**. Meridian.js will refuse to initialize on non-HTTPS pages.

## Download the compliance package

Your Meridian Dashboard includes a pre-filled SAQ A form and a summary of Meridian's PCI compliance documentation. Go to **Settings → Compliance → PCI DSS**.
