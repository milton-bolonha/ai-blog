import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Metatags essenciais */}
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.svg" />

        {/* Google Fonts: Federo & Tenor Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Federo&family=Tenor+Sans&display=swap" rel="stylesheet" />

        {/* Metatags Open Graph padrão */}
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Larissa Canhas | Fotografia & Direção de Arte" />

        {/* Metatags Twitter padrão */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body className="bg-[#f4ece4] text-[#1d2d44] selection:bg-[#D47E30] selection:text-white">


        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
