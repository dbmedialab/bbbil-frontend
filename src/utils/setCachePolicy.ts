import type { NextPageContext } from 'next/dist/shared/lib/utils'

type SetCachePolicy = (res: NextPageContext['res']) => void

const setCachePolicy: SetCachePolicy = (res) => {
  if (res) {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400')
    res.setHeader('X-Cache-Channel', 'template-frontend-nextjs')
  }
}

export default setCachePolicy
