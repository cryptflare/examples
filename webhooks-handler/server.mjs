/* eslint-disable no-console -- example script: printing to stdout is the point */
// Minimal Node HTTP server that verifies CryptFlare webhook deliveries.
// Run with: CRYPTFLARE_WEBHOOK_SECRET=whsec_... node server.mjs

import { createServer } from 'node:http'
import { verifyWebhook, WebhookVerificationError } from '@cryptflare/sdk'

const SECRET = process.env.CRYPTFLARE_WEBHOOK_SECRET
if (!SECRET) {
  console.error('Set CRYPTFLARE_WEBHOOK_SECRET (the value shown when you created the endpoint)')
  process.exit(1)
}

const server = createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/webhooks/cryptflare') {
    res.statusCode = 404
    return res.end()
  }

  let body = ''
  req.setEncoding('utf8')
  req.on('data', (chunk) => (body += chunk))
  req.on('end', async () => {
    const header = req.headers['x-cryptflare-signature']
    try {
      const event = await verifyWebhook(body, Array.isArray(header) ? header[0] : header, SECRET)
      console.log('verified event', event)
      res.statusCode = 200
      res.end('ok')
    } catch (err) {
      if (err instanceof WebhookVerificationError) {
        console.warn('verification failed:', err.code, err.message)
        res.statusCode = 400
        return res.end(err.message)
      }
      console.error('handler error', err)
      res.statusCode = 500
      res.end('internal error')
    }
  })
})

const port = Number(process.env.PORT ?? 3001)
server.listen(port, () =>
  console.log(`webhooks listening at http://localhost:${port}/webhooks/cryptflare`),
)
