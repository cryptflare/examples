# Node script example

Reveals every secret in an environment and injects them as env vars.

## Run

```bash
cd examples/node-script
npm install
CRYPTFLARE_API_KEY=cf_live_... \
  CRYPTFLARE_ORG=org_... \
  CRYPTFLARE_WORKSPACE=my-app \
  CRYPTFLARE_ENVIRONMENT=production \
  npm start
```
