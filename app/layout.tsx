import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Script from 'next/script'; // Import Next.js Script untuk Analytics
import Head from "next/head"; // Untuk menambahkan SEO dinamis

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Zian Inn',
  description: 'Zian inn adalah sebuah platform untuk mencari dan memesan properti syariah',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Zian Inn - Platform Properti Syariah</title>
        <meta name="description" content="Zian inn adalah platform untuk mencari dan memesan properti syariah" />
        <meta property="og:title" content="Zian Inn" />
        <meta property="og:description" content="Platform untuk mencari dan memesan properti syariah." />
        <meta property="og:image" content="/images/homepage-image.png" />
        <meta property="og:url" content="https://zianinn.com" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>

        {/* Google Analytics Integration */}
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
      </body>
    </html>
  );
}
