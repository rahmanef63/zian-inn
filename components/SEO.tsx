import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

const SEO = ({ title, description, imageUrl, url,  }: SEOProps): JSX.Element => {
  return (
    <Head>
      <title>{title} - Zian Inn</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
    </Head>
  );
};

export default SEO;
