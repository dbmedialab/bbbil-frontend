import { Span } from 'opentracing'
import 'http'

declare module 'http' {
  interface IncomingMessage {
    span: Span | undefined
  }
}
