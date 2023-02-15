/*
	Returns if request is made from any app
	(not just app corresponding to current site)
*/
import type { IncomingHttpHeaders } from 'node:http2'

const checkForAnyApp = (headers: IncomingHttpHeaders | undefined): boolean => {
  if (!headers) return false

  const userAgent = headers['x-ua-agent']

  return !!String(userAgent).match('app')
}

export default checkForAnyApp
