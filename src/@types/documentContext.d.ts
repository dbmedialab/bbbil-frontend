import { Span } from 'opentracing'

declare module 'next/document' {
  export * from 'next/document'

  export type DocumentContext = DocumentContext & {
    req?: DocumentContext.req & {
      hostname: string
      trace?: boolean
      span?: Span
    }
  }
}
