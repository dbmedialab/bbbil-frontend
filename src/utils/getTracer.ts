import type { DocumentContext } from 'next/document'
import type { Tracer } from 'opentracing'
import { Span } from 'opentracing'
import { getGlobalTracer, log } from '@aller/express-opentracing'

interface GetTracerOptions {
  spanName: string
  req?: DocumentContext['req']
  tags: Record<string, string>
}

let tracer: Tracer

export const getTracer = ({ spanName, req, tags = {} }: GetTracerOptions) => {
  tracer = tracer || getGlobalTracer({})
  let span: Span | undefined
  if (req?.trace) {
    span = tracer.startSpan(spanName, {
      childOf: req?.span,
      tags,
    })
  }

  const finishTracing = () => {
    span?.finish()
  }

  return {
    tracer,
    span,
    finishTracing,
    log,
  }
}
