# CryptFlare examples

Runnable samples for [`@cryptflare/sdk`](https://www.npmjs.com/package/@cryptflare/sdk). Each example pins the latest published SDK and is self-contained: clone, install, run.

> This repository is auto-synced from the private monorepo. Source of truth: `packages/sdk/typescript/examples/` in `cryptflare/cryptflare-platform`. Open issues for example-specific bugs here; SDK bugs go to <https://github.com/cryptflare/cryptflare-js/issues>.

| Example                                          | What it shows                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------- |
| [`node-script/`](./node-script/)                 | Plain Node script - reveal a secret and inject it as `process.env`. |
| [`cloudflare-worker/`](./cloudflare-worker/)     | `fetch` handler running on Workers; service token via env binding.  |
| [`bun-server/`](./bun-server/)                   | HTTP server on Bun returning a redacted secret list.                |
| [`webhooks-handler/`](./webhooks-handler/)       | Verify CryptFlare webhook deliveries with `verifyWebhook`.          |
| [`envelope-encryption/`](./envelope-encryption/) | Bring-your-own-key client-side AES-256-GCM with `LocalKeyring`.     |

All examples expect:

```bash
export CRYPTFLARE_API_KEY=cf_live_...
export CRYPTFLARE_ORG=org_...
export CRYPTFLARE_WORKSPACE=my-app
export CRYPTFLARE_ENVIRONMENT=production
```
