import React, { FC } from 'react'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import { createGlobalStyle } from 'styled-components'
import { cssReset } from '@aller/shared/utils/css-reset'
import Head from 'next/head'
import checkForApp from '@/src/utils/checkForApp'

interface MyAppProps extends AppProps {
  siteName: string
  isApp: boolean
}

const GlobalStyle = createGlobalStyle`${cssReset}`

interface Props {
  children: JSX.Element
}

if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line global-require
    require('@welldone-software/why-did-you-render')(React, {
      trackAllPureComponents: true,
      trackHooks: true,
      logOwnerReasons: true,
      collapseGroups: true,
    })
  }
}

const FunctionalApp: FC<Props> = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  )
}
export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, siteName, isApp } = props
  const title = siteName.includes('localhost') ? 'LocalName' : siteName

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <FunctionalApp {...props}>
        <Component {...pageProps} siteName={siteName} isApp={isApp} />
      </FunctionalApp>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const initialProps = await App.getInitialProps(appContext)

  const { req } = appContext.ctx
  const hostname = (req && req.headers.host) || ''
  const isApp = req && req.headers && checkForApp(hostname, req.headers)

  return {
    ...initialProps,
    siteName: hostname,
    isApp,
  }
}
