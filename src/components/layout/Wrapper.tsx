import React from 'react'
import styled from 'styled-components'
import { useHydrateAtoms } from 'jotai/utils'
import AdProvider from '@aller/shared/components/LoganAds/Provider'
import AdsModal from '@aller/shared/components/LoganAds/Modal'

import MediumRectangle from '@/src/components/ads/mediumRectangle/MediumRectangle'
import PrivacyPopup from '@/src/components/privacyPopup/PrivacyPopup'
import ThemeProvider from '@/src/components/themeProvider/ThemeProvider'
import { covidAtom, CovidData } from '@/src/store/covid'

const Container = styled.main`
  position: relative;
`

interface LayoutProps {
  children: JSX.Element[]
  isApp?: boolean
  vaccinations?: CovidData
}

const Layout = (props: LayoutProps) => {
  const { children, isApp = false, vaccinations } = props
  useHydrateAtoms([[covidAtom, vaccinations]])
  const siteName = 'Counter'

  return (
    <AdProvider>
      <ThemeProvider>
        <AdsModal />
        <Container>{children}</Container>
        <MediumRectangle position={1} />
        {!isApp && <PrivacyPopup site={siteName} />}
      </ThemeProvider>
    </AdProvider>
  )
}

Layout.whydidyourender = true

export default Layout
