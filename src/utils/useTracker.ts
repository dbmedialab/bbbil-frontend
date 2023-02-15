import { useEffect } from 'react'
import BlinkLabrador from '@aller/blink-labrador'

let tracker: null | BlinkLabrador = null

const startTracking = () => {
  tracker?.trackPageload()
  tracker?.trackPerformance()
  tracker?.trackAdInscreen0('.adunit')
  tracker?.trackAdInscreen('.adunit')
  tracker?.trackActiveTime()
  tracker?.trackLinkClicks()
  tracker?.trackArticleImpressions('article.preview,article.preview-blink,.article-list>li')
  tracker?.trackAdDFP()
}

export const useTracker = () => {
  if (typeof window === 'undefined') {
    return null
  }
  tracker = tracker || new BlinkLabrador()
  return {
    tracker,
    startTracking,
  }
}

export const useInitTracking = () => {
  const tracking = useTracker()
  useEffect(() => {
    if (!tracking) {
      return
    }
    const { startTracking } = tracking
    startTracking()
  })
}
