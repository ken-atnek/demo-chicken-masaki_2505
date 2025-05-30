/* =======================================
 * チキンショップまさきDEMOサイト Layout
 * URL:src/app/layout.tsx
 * Created: 2025-05-24
 * Last updated: 2025-05-24
 * ======================================= */

import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { Noto_Sans_JP } from 'next/font/google';
import { Roboto } from 'next/font/google';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});

// 実際の本番環境かどうかを判定
const isRealProduction = process.env.NEXT_PUBLIC_IS_REAL_PROD === 'true';

// 本番のみ metadataBase を設定
const metadataBase = isRealProduction
  ? new URL(
      process.env.NEXT_PUBLIC_METADATA_BASE ||
        'https://demo-chicken-masaki.tuna-pic.co.jp/'
    )
  : undefined;

export const metadata: Metadata = {
  ...(isRealProduction && {
    metadataBase,
    openGraph: {
      title: ' チキンショップまさきDEMOサイト',
      description: 'チキンショップまさきDEMOサイト',
      url: metadataBase?.toString(),
      type: 'website',
      images: [
        {
          url: './images/ogp.jpg',
          width: 1200,
          height: 630,
          alt: 'チキンショップまさきDEMOサイトのOGP画像',
        },
      ],
    },
  }),
  title: ' チキンショップまさきDEMOサイト',
  description: isRealProduction
    ? 'チキンショップまさきDEMOサイト。'
    : undefined,
  robots: isRealProduction ? 'index, follow' : 'noindex, nofollow',
  icons: [
    {
      url: '/favicon.ico',
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/favicon.ico',
      media: '(prefers-color-scheme: dark)',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSans.className} ${roboto.className}`}>
      <head>
        <meta
          name="robots"
          content={isRealProduction ? 'index, follow' : 'noindex, nofollow'}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="format-detection"
          content="telephone=no, address=no, email=no"
        />
      </head>
      <body>
        {/* <Header /> */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
