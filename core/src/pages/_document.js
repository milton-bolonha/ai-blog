import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import logos from "@/content/settings/logos.json";
import theme from "@/content/settings/theme.json";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App {...props} />,
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
    };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <link
            rel="icon prefetch"
            href={logos.faviconLogo || "/brandimages/favicon.png"}
            sizes="any"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Federo&family=Tenor+Sans&display=swap" rel="stylesheet" />
        </Head>
        <body
          className={`boilerplate-times theme-${theme.generalThemeSettings.themeStyle}`}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
