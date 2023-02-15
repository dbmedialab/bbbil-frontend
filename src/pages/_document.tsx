import React from 'react'
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { Tags } from 'opentracing'
import FavIcons from '@/src/components/favicon'
import checkForAnyApp from '@/src/utils/checkForAnyApp'
import EsiIncludeInScript from '@/src/components/esiInclude/EsiInclude'
import { getTracer } from '@/src/utils/getTracer'

interface MyDocumentProps extends DocumentProps {
  host: string
  anyApp: boolean
}

export default function MyDocument({ host, anyApp }: MyDocumentProps) {
  const isDev = host?.includes('localhost') || host?.includes('medialaben')
  const fontsPath = isDev ? 'https://www.elbil24.no/_fonts' : '/_fonts'
  return (
    <Html lang="no">
      <Head>
        <FavIcons />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge;" />
        <link
          rel="preload"
          href="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          as="script"
        />
        <link
          rel="modulepreload"
          href="https://am.medialaben.no/scripts/prebid6.11.0.js"
          as="script"
        />
        <link
          rel="preload"
          href={`${fontsPath}/woff2/roboto-900.woff2`}
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href={`${fontsPath}/woff2/roboto-700.woff2`}
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href={`${fontsPath}/woff2/roboto-500.woff2`}
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href={`${fontsPath}/woff2/roboto-400.woff2`}
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://am.medialaben.no/scripts/prebid5.20.2.js"
          as="script"
          type="text/javascript"
        />
        <link
          rel="preload"
          href="https://am.medialaben.no/scripts/prebid6.11.0.js"
          as="script"
          type="text/javascript"
        />
        <script defer src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" />

        {anyApp && (
          // script that 'preconfigures' linkpulse for app MBL tracking
          // should be executed before medietall/analytics.js
          // defer preserves the order of execution
          <EsiIncludeInScript
            id="mbl-app-tracking"
            src="http://public-scripts.prod.medialaben.no/apps/preload-script.js"
          />
        )}
        <script
          src="https://pp.lp4.io/app/4f/62/82/4f62822df925b31540000000.js?t=20218211242"
          id="linkpulse"
        />
        <script src="//cl-eu2.k5a.io/61828d9316dbc70bd27919a2.js" id="kilkaya" />
        <script src="//log.medietall.no/analytics.js" id="lp-script" defer />

        <style type="text/css">
          {`@font-face {
						font-family: 'Roboto';
						font-style: normal;
						font-weight: 400;
						src: local('Roboto-Regular'), local('Roboto-Regular'),
							url('/_fonts/woff2/roboto-400.woff2?v=2') format('woff2'),
							url('/_fonts/woff/roboto-400.woff?v=2') format('woff');
						font-display: swap;
						}
						@font-face {
						font-family: 'Roboto';
						font-style: normal;
						font-weight: 500;
						src: local('Roboto-Medium'), local('Roboto-Medium'),
							url('/_fonts/woff2/roboto-500.woff2?v=2') format('woff2'),
							url('/_fonts/woff/roboto-500.woff?v=2') format('woff');
						font-display: swap;
						}
						@font-face {
						font-family: 'Roboto';
						font-style: normal;
						font-weight: 700;
						src: local('Roboto-Bold'), local('Roboto-Bold'),
							url('/_fonts/woff2/roboto-700.woff2?v=2') format('woff2'),
							url('/_fonts/woff/roboto-700.woff?v=2') format('woff');
						font-display: swap;
						}
						@font-face {
						font-family: 'Roboto';
						font-style: normal;
						font-weight: 900;
						src: local('Roboto-Black'), local('Roboto-Black'),
							url('${fontsPath}/woff2/roboto-900.woff2?v=2') format('woff2'),
							url('${fontsPath}/woff/roboto-900.woff?v=2') format('woff');
						font-display: swap;
						}`}
        </style>
        <link rel="dns-prefetch" href="https://adx.adform.net" />
        <link rel="dns-prefetch" href="https://securepubads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagservices.com" />
        <link rel="dns-prefetch" href="https://bam.nr-data.net" />
        <link rel="dns-prefetch" href="https://csi.gstatic.com" />
        <link rel="dns-prefetch" href="https://pp.lp4.io" />
        <link rel="dns-prefetch" href="https://cl-eu2.k5a.io" />
        <link rel="dns-prefetch" href="https://ads.avocet.io" />
        <link rel="dns-prefetch" href="https://pixel-sync.sitescout.com" />
        <link rel="dns-prefetch" href="https://dclk-match.dotomi.com" />
        <link rel="dns-prefetch" href="https://bid.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://tpc.googlesyndication.com" />
        <link rel="preconnect" href="https://currency.prebid.org" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://adservice.google.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ads.rubiconproject.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://s.update.rubiconproject.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fastlane.rubiconproject.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://code3.adtlgc.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ib.adnxs.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://platform.instagram.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const { span, finishTracing, log } = getTracer({
    spanName: 'Document.getInitialProps',
    req: ctx.req,
    tags: {
      [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER,
      [Tags.HTTP_URL]: ctx?.req?.url || '',
      [Tags.HTTP_METHOD]: ctx?.req?.method || '',
      [Tags.COMPONENT]: 'template-frontend-nextjs',
    },
  })
  log({ event: 'start', span })
  const sheet = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage

  try {
    log({ event: 'render', span })
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      })
    log({ event: 'getInitialProps', span })
    const initialProps = await Document.getInitialProps(ctx)
    const anyApp = checkForAnyApp(ctx.req?.headers)
    const host = ctx.req?.hostname
    log({ event: 'finish', span })
    return {
      ...initialProps,
      host,
      anyApp,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    }
  } catch (error: any) {
    log({ event: 'error', span, error })
    throw error
  } finally {
    sheet.seal()
    finishTracing()
  }
}
