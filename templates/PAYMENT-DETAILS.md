# Softworks Trading Company LLC — Payment Details

Reference for all invoices across business units.

---

## 1. Domestic Transfers (US Clients)

Use for ACH and domestic wire transfers from US banks.

| Field | Value |
|-------|-------|
| **Bank Name** | Choice Financial Group |
| **Routing (ABA)** | `091311229` |
| **Account Number** | `202583720728` |
| **Account Type** | Checking |
| **Beneficiary** | Softworks Trading Company LLC |
| **Beneficiary Address** | 30 N Gould St Ste N, Sheridan, WY 82801 |

---

## 2. International Wire — USD

Use when client is sending **USD** from abroad.

| Field | Value |
|-------|-------|
| **SWIFT/BIC** | `CHFGUS44021` |
| **Routing (ABA)** | `091311229` |
| **Bank Name** | Choice Financial Group |
| **Bank Address** | 4501 23rd Avenue S, Fargo, ND 58104, USA |
| **Account Number** | `202583720728` |
| **Beneficiary** | Softworks Trading Company LLC |
| **Beneficiary Address** | 30 N Gould St Ste N, Sheridan, WY 82801, USA |

---

## 3. International Wire — Foreign Currency (FX)

Use when client is sending **non-USD** (NGN, EUR, GBP, CAD, etc.).

Goes through JP Morgan Chase as intermediary bank.

### Receiving Bank (Intermediary)

| Field | Value |
|-------|-------|
| **SWIFT/BIC** | `CHASUS33XXX` |
| **Routing (ABA)** | `021000021` |
| **Bank Name** | JP Morgan Chase Bank, N.A. – New York |
| **Bank Address** | 383 Madison Avenue, Floor 23, New York, NY 10017, USA |

### Beneficiary

| Field | Value |
|-------|-------|
| **Account Number** | `707567692` |
| **Beneficiary Name** | Choice Financial Group |
| **Beneficiary Address** | 4501 23rd Ave S, Fargo, ND 58104, USA |

### ⚠️ REQUIRED MEMO

Client **MUST** include this in the memo/reference field:

```
/FFC/202583720728/Softworks Trading Company LLC/-Sheridan, USA
```

Without this memo, funds may not reach the account.

---

## When to Use Which

| Client Location | Currency Sending | Use |
|-----------------|------------------|-----|
| United States | USD | **Domestic** |
| International | USD | **International USD** |
| International | NGN, EUR, GBP, etc. | **International FX** |

### Examples

- **US client paying in USD** → Domestic
- **UK client paying in USD** → International USD
- **UK client paying in GBP** → International FX
- **Nigeria client paying in NGN** → International FX
- **Nigeria client paying in USD** → International USD

---

## Bank Partner

Mercury uses **Choice Financial Group** as banking partner.

Source: Mercury Wire Details PDF (January 2026)
