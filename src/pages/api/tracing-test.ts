import { fetchWithTracing } from '@aller/express-opentracing'
import { NextApiRequest, NextApiResponse } from 'next'
import { Tags } from 'opentracing'
import { getTracer } from '@/src/utils/getTracer'

/**
 * @example tracing-endpoint
 *
 * Example of how to do tracing with a fetch. This should
 * be removed before it hits any production endpoints.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { span, finishTracing, log } = getTracer({
    spanName: 'tracing-test',
    req,
    tags: {
      [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER,
      [Tags.HTTP_URL]: req?.url || '',
      [Tags.HTTP_METHOD]: req?.method || '',
      [Tags.COMPONENT]: 'template-frontend-nextjs',
    },
  })

  log({ event: 'start', span })
  try {
    // To get the whole flow traced, the fetchWithTracing
    // function needs to be used
    const data = await fetchWithTracing(
      'https://covid19-api.stage.medialaben.no/api/v1/vaccinations/county',
      { json: true, timeout: 750 },
      span,
    )

    res.send(data)
  } catch (error: any) {
    log({ event: 'error', error })
    res.status(500)
  } finally {
    log({ event: 'finish', span })

    finishTracing()
  }
}
