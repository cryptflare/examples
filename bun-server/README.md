# Bun server example

HTTP server on Bun returning a redacted secret listing.

## Run

```bash
cd examples/bun-server
bun install
CRYPTFLARE_API_KEY=cf_live_... \
  CRYPTFLARE_ORG=org_... \
  CRYPTFLARE_WORKSPACE=my-app \
  CRYPTFLARE_ENVIRONMENT=production \
  bun start
```

Then `curl http://localhost:3000/secrets`.
