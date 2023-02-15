import React, { useState, useEffect } from 'react'
import styled, { withTheme } from 'styled-components'
import getColor from '@/src/utils/getColor'

const Box = styled.div`
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  max-width: ${(props) => props.theme.flexboxgrid.container.lg + 1.5}rem;
  min-height: 15rem;
  border-top-left-radius: 1.7rem;
  border-top-right-radius: 1.7rem;
  box-shadow: 0 0 1.4rem 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  z-index: 5;
  padding: 2.6rem 7rem;
  font-family: ${(props) => props.theme.variables.mainFont};

  @media screen and (max-width: ${(props) => props.theme.flexboxgrid.breakpoints.sm}em) {
    padding: 1.5rem 2.9rem;
  }
`

const Title = styled.h1`
  font-size: ${(props) => props.theme.variables.headingRegularSize};
  line-height: ${(props) => props.theme.variables.headingRegularLineHeight};
  font-weight: ${(props) => props.theme.variables.uiWeightBold};
  color: ${() => getColor('type')};
  margin-bottom: 0.5rem;

  @media screen and (max-width: ${(props) => props.theme.flexboxgrid.breakpoints.sm}em) {
    font-size: ${(props) => props.theme.variables.headingMediumSize};
    line-height: ${(props) => props.theme.variables.headingMediumLineHeight};
  }
`

const Body = styled.p`
  color: ${() => getColor('type')};
  @media screen and (max-width: ${(props) => props.theme.flexboxgrid.breakpoints.sm}em) {
    font-size: ${(props) => props.theme.variables.uiSmallSize};
    line-height: ${(props) => props.theme.variables.uiSmallLineHeight};
  }
`

const SettingsLink = styled.a`
  margin-left: 5px;
  color: ${(props) => props.theme.colors.primary};
  white-space: nowrap;
`

const ReadMoreButton = styled.a`
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  font-size: ${(props) => props.theme.variables.uiRegularSize};
  width: 20rem;
  height: 4rem;
  line-height: 4rem;
  border-radius: 1.8rem;
  border: solid 0.1rem ${() => getColor('grayTint')};
  background-color: ${() => getColor('background')};
  color: ${() => getColor('type')};
  margin-right: 2rem;
  font-weight: ${(props) => props.theme.variables.uiWeightBold};

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: ${(props) => props.theme.flexboxgrid.breakpoints.sm}em) {
    font-size: ${(props) => props.theme.variables.uiSmallSize};
    line-height: 3.2rem;
    height: 3.2rem;
    width: 11.5rem;
    margin-right: 0.5rem;
  }
`

const ReadMoreButtonButton = ReadMoreButton.withComponent('button')

const OkayButton = styled(ReadMoreButtonButton)`
  background-color: ${(props) => props.theme.colors.primary};
  border: solid 0.1rem ${(props) => props.theme.colors.primary};
  color: #fff;
`

const localStorageKey = 'pp_notified'

interface PrivacyPopupProps {
  site: string
  theme: {
    name: string
  }
}

const PrivacyPopup = ({ site, theme: { name } }: PrivacyPopupProps) => {
  const [show, setShow] = useState(false)

  function handleClick() {
    setShow(false)
    try {
      localStorage.setItem(localStorageKey, `${Date.now()}`)
    } catch (error) {
      console.warn(error)
    }
  }

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      try {
        const notified = localStorage.getItem(localStorageKey)

        if (!notified) {
          setShow(true)
        }
      } catch (error) {
        console.warn(error)
      }
    }
  }, [])

  if (!show) return null
  // Some themes have e.g. "Dark" which is not relevant, use first word
  const themeSite = name.split(' ')[0]
  return (
    <Box data-testid="privacy-popup">
      <Title>Vi bryr oss om ditt personvern</Title>
      <Body>
        {site || themeSite || 'Dette nettstedet'} er en del av Aller Media, som er ansvarlig for
        dine data. Vi bruker dataene til å forbedre og tilpasse tjenestene, tilbudene og annonsene
        våre.
      </Body>
      <Body>
        Vil du vite mer om hvordan du kan endre dine innstillinger, gå til
        <SettingsLink target="_blank" href="https://personvern.aller.no/personverninnstillinger">
          personverninnstillinger
        </SettingsLink>
      </Body>
      <ReadMoreButton href="https://personvern.aller.no/personvern" target="_blank" rel="noopener">
        Les mer
      </ReadMoreButton>
      <OkayButton onClick={() => handleClick()}>Jeg forstår</OkayButton>
    </Box>
  )
}

PrivacyPopup.whydidyourender = true

export default withTheme(PrivacyPopup)
