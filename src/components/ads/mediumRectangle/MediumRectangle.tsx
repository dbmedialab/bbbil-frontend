import React from 'react'
import MediumRectangle from '@aller/shared/components/LoganAds/MediumRectangle'

interface IAd {
  position: number
}

const StyledAd = ({ position }: IAd) => {
  return <MediumRectangle pos={position} />
}

StyledAd.whyDidYouRender = true

export default StyledAd
