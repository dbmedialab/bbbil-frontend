/**
 * Check if request is coming from application
 * @param {string} site - site identifier without domain extension and www
 * (dagbladet, seher etc)
 * @param {object} headers - req.headers object coming from express
 */
import type { IncomingHttpHeaders } from 'node:http2'

const checkForApp = (site: string, headers: IncomingHttpHeaders): boolean => {
  // used in node env, so preserve module.exports. Should not be a problem
  if (!site) return false

  const userAgent = headers['x-ua-agent']
  const mobileVer = headers['x-ua-mobile-ver']

  if (!userAgent || !mobileVer) return false

  site = extractHost(site)

  // for development
  if (site === 'localhost') return true

  const requiredMobileVer = getRequiredMobileVer(site)

  // mobileVer is set through varnish and now is
  // single source of truth of determining if request coming from app
  // Also, we check for a certain site, because we might come
  // to another website inside of an app's webview. For instance,
  // from db app we can go to seher website (and privacy popup should be there)
  const result = String(userAgent).match('app') && String(mobileVer).match(requiredMobileVer)

  return !!result
}

/**
 * extract host from site string
 */
function extractHost(site: string) {
  const urlParts = site.split('.')

  // stripping 'www' prefix
  if (urlParts[0] === 'www') {
    urlParts.shift()
  }

  // stripping 'stage' prefix
  if (urlParts[0] === 'stage') {
    urlParts.shift()
  }

  // stripping 'stage-beta' prefix
  if (urlParts[0] === 'stage-beta') {
    urlParts.shift()
  }

  return urlParts[0]
}

function getRequiredMobileVer(host: string) {
  if (host === 'dagbladet') {
    return 'db'
  }

  return host
}

export default checkForApp
