import { CryptFlare, NotFoundError } from '@cryptflare/sdk'

type Env = {
  CRYPTFLARE_SERVICE_TOKEN: string
  CRYPTFLARE_ORG: string
  CRYPTFLARE_WORKSPACE: string
  CRYPTFLARE_ENVIRONMENT: string
}

export default {
  async fetch(_req: Request, env: Env): Promise<Response> {
    const cryptflare = new CryptFlare({
      serviceToken: env.CRYPTFLARE_SERVICE_TOKEN,
      organisation: env.CRYPTFLARE_ORG,
      workspace: env.CRYPTFLARE_WORKSPACE,
      environment: env.CRYPTFLARE_ENVIRONMENT,
    })

    try {
      const page = await cryptflare.secrets.list()
      return Response.json({
        count: page.data.length,
        keys: page.data.map((s) => s.key),
      })
    } catch (err) {
      if (err instanceof NotFoundError) {
        return new Response('environment not found', { status: 404 })
      }
      throw err
    }
  },
}
