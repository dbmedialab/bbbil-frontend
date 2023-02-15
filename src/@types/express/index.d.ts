import { Span } from 'opentracing'

declare global {
  namespace Express {
    interface Request {
      trace?: boolean
      span: Span
    }
  }
}
