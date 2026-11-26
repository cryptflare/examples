# Envelope encryption

Stores a secret in CryptFlare with client-side AES-256-GCM, then reveals + unseals it locally. The CryptFlare API only ever sees the opaque envelope.

## Mint a master key

```bash
node keygen.mjs
```

Save the output as `CRYPTFLARE_MASTER_KEY`. Anywhere you would normally keep an application secret is fine - your KMS, Vault, AWS Secrets Manager, environment variable in CI, etc. **Lose it and any value sealed under it is unrecoverable.**

## Run the round-trip

```bash
CRYPTFLARE_API_KEY=cf_live_... \
CRYPTFLARE_ORG=org_... \
CRYPTFLARE_WORKSPACE=my-app \
CRYPTFLARE_ENVIRONMENT=production \
CRYPTFLARE_MASTER_KEY=$(node keygen.mjs) \
node index.mjs
```

Expected output:

```
sealed length: 312 bytes (vs plaintext 47)
stored EXAMPLE_ENVELOPE_VALUE
round-trip ok: true
deleted EXAMPLE_ENVELOPE_VALUE
```

## Read the [envelope encryption docs](https://docs.cryptflare.com/sdk/typescript/envelope-encryption)

For format details, KMS-backed keyring patterns (AWS / GCP), and key rotation strategy.
