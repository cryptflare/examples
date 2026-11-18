/* eslint-disable no-console -- example script: printing to stdout is the point */
// Round-trips a secret value through CryptFlare with client-side
// envelope encryption. CryptFlare never sees the plaintext.
//
// Run:
//   CRYPTFLARE_API_KEY=cf_live_... \
//   CRYPTFLARE_ORG=org_... \
//   CRYPTFLARE_WORKSPACE=my-app \
//   CRYPTFLARE_ENVIRONMENT=production \
//   CRYPTFLARE_MASTER_KEY=$(node keygen.mjs) \
//   node index.mjs

import { CryptFlare, LocalKeyring, isEnvelope, seal, unseal } from '@cryptflare/sdk'

const required = [
  'CRYPTFLARE_API_KEY',
  'CRYPTFLARE_ORG',
  'CRYPTFLARE_WORKSPACE',
  'CRYPTFLARE_ENVIRONMENT',
  'CRYPTFLARE_MASTER_KEY',
]
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Set ${key}`)
    process.exit(1)
  }
}

const cryptflare = new CryptFlare({
  apiKey: process.env.CRYPTFLARE_API_KEY,
  organisation: process.env.CRYPTFLARE_ORG,
  workspace: process.env.CRYPTFLARE_WORKSPACE,
  environment: process.env.CRYPTFLARE_ENVIRONMENT,
})

const keyring = new LocalKeyring({
  masterKey: process.env.CRYPTFLARE_MASTER_KEY,
  kid: 'demo',
})

const KEY = 'EXAMPLE_ENVELOPE_VALUE'
const PLAIN = 'sk_live_envelope_demo_value_' + Date.now()

const sealed = await seal(PLAIN, keyring)
console.log(`sealed length: ${sealed.length} bytes (vs plaintext ${PLAIN.length})`)

await cryptflare.secrets.create({ key: KEY, value: sealed })
console.log(`stored ${KEY}`)

const stored = await cryptflare.secrets.reveal({ key: KEY })
if (!isEnvelope(stored.value)) {
  console.error('expected an envelope, got plaintext - did something else write this key?')
  process.exit(1)
}
const recovered = await unseal(stored.value, keyring)
console.log('round-trip ok:', recovered === PLAIN)

await cryptflare.secrets.delete({ key: KEY })
console.log(`deleted ${KEY}`)
