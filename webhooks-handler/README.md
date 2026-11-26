# Webhooks handler

Verifies CryptFlare webhook deliveries with `verifyWebhook`. Forwards verified events to your business logic; returns `400` for any signature, timestamp, or body integrity failure.

## Run locally

```bash
cd examples/webhooks-handler
npm install
CRYPTFLARE_WEBHOOK_SECRET=whsec_... node server.mjs
```

Then point a tunnel (`ngrok`, `cloudflared`, etc.) at `http://localhost:3001/webhooks/cryptflare` and register that URL in the CryptFlare dashboard. Trigger an event (rotate a secret, etc.) and watch the verified payload print.

## What it shows

- Reading the **raw** request body (not the parsed JSON) before verification.
- Mapping `WebhookVerificationError` codes to a `400` response.
- Constant-time signature compare and replay-protection are baked into the helper.
