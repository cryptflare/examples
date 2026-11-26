# Cloudflare Worker example

A Worker that lists secret keys from CryptFlare on every request. The service token comes from a wrangler secret; metadata (org, workspace, environment) from `wrangler.toml`.

## Setup

```bash
cd examples/cloudflare-worker
npm install
wrangler secret put CRYPTFLARE_SERVICE_TOKEN
# paste a service token scoped to one workspace + environment
```

Edit `wrangler.toml` and replace the placeholder org / workspace / environment.

## Run

```bash
npm run dev
# or deploy
npm run deploy
```
