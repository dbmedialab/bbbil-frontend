import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { tracingMiddleware } from '@aller/express-opentracing'

dotenv.config()

export const shouldTraceMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  if (req.url.includes('/_healthz') || req.url.includes('/_next') || req.url.includes('/metrics')) {
    return next()
  }
  req.trace = true
  return tracingMiddleware()(req, res, next)
}
