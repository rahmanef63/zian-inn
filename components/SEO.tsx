import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

interface SEOProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

const SEO = ({ title, description, imageUrl, url }: SEOProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title} - Zian Inn</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={url} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Google Analytics */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-S5RBHPG13C"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S5RBHPG13C', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default SEO;
