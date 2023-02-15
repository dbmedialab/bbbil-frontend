/* eslint-disable max-len */
import React from 'react'
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components'
import theme from '@/src/theme'

const ThemeProvider = ({ children }: { children: any }) => {
  const GlobalStyles = createGlobalStyle`${theme.global}`

  return (
    <StyledThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        {children}
      </>
    </StyledThemeProvider>
  )
}

ThemeProvider.whyDidYouRender = true

export default ThemeProvider
