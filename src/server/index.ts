import express, { Request, Response } from 'express'
import { createMiddleware, getSummary, getContentType } from '@promster/express'
import { startGlobalTracer, tracingMiddleware } from '@aller/express-opentracing'

const next = require('next')

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

const { options } = startGlobalTracer({
  serviceName: process.env.PROJECT_NAME || 'template-frontend-nextjs',
  jaegerSamplerType: process.env.JAEGER_SAMPLER_TYPE || 'const',
  jaegerSamplerParam: parseFloat(process.env.JAEGER_SAMPLER_PARAM ?? '1') || 1,
  jaegerAgentHost: process.env.JAEGER_AGENT_HOST || 'localhost',
})

app.prepare().then(() => {
  const server = express()
  server.use(createMiddleware({ app, options }))
  server.use(
    tracingMiddleware({
      ignoreRoute: '^(/(metrics||_(healthz|next))|)(|/|/.*.(js|css|json))$',
    }),
  )
  server.use('/metrics', async (req: Request, res: Response) => {
    req.statusCode = 200

    res.setHeader('Content-Type', getContentType())
    res.end(await getSummary())
  })
  server.get('/', (req: Request, res: Response) => handle(req, res))

  // Required or you will get mime type errors
  server.get('*', (req: Request, res: Response) => handle(req, res))

  server.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`,
    )
  })
})
