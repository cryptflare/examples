import { CryptFlare, APIError } from '@cryptflare/sdk'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set`)
  return value
}

const cryptflare = new CryptFlare({
  apiKey: requireEnv('CRYPTFLARE_API_KEY'),
  organisation: requireEnv('CRYPTFLARE_ORG'),
  workspace: requireEnv('CRYPTFLARE_WORKSPACE'),
  environment: requireEnv('CRYPTFLARE_ENVIRONMENT'),
})

const port = Number(process.env.PORT ?? 3000)

Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url)
    if (url.pathname !== '/secrets') return new Response('not found', { status: 404 })

    try {
      const page = await cryptflare.secrets.list()
      return Response.json({
        // Only return keys + metadata. Never the values.
        secrets: page.data.map((s) => ({
          key: s.key,
          version: s.version,
          updatedAt: s.updatedAt,
        })),
      })
    } catch (err) {
      if (err instanceof APIError) {
        return Response.json(
          { error: err.code, message: err.message, requestId: err.requestId },
          { status: err.status ?? 500 },
        )
      }
      throw err
    }
  },
})

console.info(`Listening on http://localhost:${port}/secrets`)
