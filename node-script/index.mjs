/* eslint-disable no-console -- example script: printing to stdout is the point */
import { CryptFlare, AuthenticationError, NotFoundError } from '@cryptflare/sdk'

const client = new CryptFlare({
  apiKey: process.env.CRYPTFLARE_API_KEY,
  organisation: process.env.CRYPTFLARE_ORG,
  workspace: process.env.CRYPTFLARE_WORKSPACE,
  environment: process.env.CRYPTFLARE_ENVIRONMENT,
})

try {
  // 1. List secret metadata in the active environment.
  const page = await client.secrets.list()
  console.log(`Found ${page.data.length} secrets:`)
  for (const secret of page.data) {
    console.log(`  ${secret.key}  v${secret.version}  updated ${secret.updatedAt}`)
  }

  // 2. Reveal one and inject it into process.env.
  if (page.data[0]) {
    const revealed = await client.secrets.reveal({ key: page.data[0].key })
    process.env[revealed.key] = revealed.value
    console.log(`\nInjected ${revealed.key} into process.env`)
  }
} catch (err) {
  if (err instanceof AuthenticationError) {
    console.error('Auth failed - check CRYPTFLARE_API_KEY')
  } else if (err instanceof NotFoundError) {
    console.error('Org / workspace / environment not found - check the env vars')
  } else {
    console.error('Unexpected:', err)
  }
  process.exit(1)
}
