import type { DocumentContext, DocumentInitialProps } from 'next/document'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          <meta name="application-name" content="AgroApp" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          {/* <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          /> */}
          <meta name="apple-mobile-web-app-title" content="AgroApp" />
          <meta name="description" content="O App do campo" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          {/* <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          ></meta> */}
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#fff" />
          <meta name="msapplication-tap-highlight" content="no" />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />

          <meta name="theme-color" content="#203038" />
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&family=Signika+Negative:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />

          <link rel="apple-touch-icon" href="../../icons/iconb-384x384.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="../../icons/iconb-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="../../icons/iconb-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="../../icons/iconb-192x192.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="../../icons/icon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="../../icons/icon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="../../icons/icon-384x384.png"
            color="#203038"
          />
          <link rel="shortcut icon" href="../../favicon.ico" />

          {/* <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://yourdomain.com" />
          <meta name="twitter:title" content="PWA App" />
          <meta
            name="twitter:description"
            content="Best PWA App in the world"
          />
          <meta
            name="twitter:image"
            content="https://yourdomain.com/icons/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@DavidWShadow" /> */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="AgroApp" />
          <meta
            property="og:description"
            content="Sistema para controle de maquinários em Agronegócio"
          />
          <meta property="og:site_name" content="AgroApp" />
          <meta property="og:url" content="https://agro-app-ten.vercel.app" />
          {/* <meta
            property="og:image"
            content="https://yourdomain.com/icons/apple-touch-icon.png"
          /> */}

          {/* apple splash screen images */}
          <link
            rel="apple-touch-startup-image"
            href="../../icons/splash.png"
            sizes="2048x2732"
          />
          <link
            rel="apple-touch-startup-image"
            href="../../icons/splash.png"
            sizes="1668x2224"
          />
          <link
            rel="apple-touch-startup-image"
            href="../../icons/splash.png"
            sizes="1536x2048"
          />
          <link
            rel="apple-touch-startup-image"
            href="../../icons/splash.png"
            sizes="1125x2436"
          />
          <link
            rel="apple-touch-startup-image"
            href="../../icons/splash.png"
            sizes="1242x2208"
          />
          <link
            rel="apple-touch-startup-image"
            href="../../icons/splash.png"
            sizes="750x1334"
          />
          <link
            rel="apple-touch-startup-image"
            href="../../icons/splash.png"
            sizes="640x1136"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
