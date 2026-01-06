import '@/styles/global.css';
import '@/styles/layout.scss';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import StoreProviders from '@/providers/store-providers';
import { AppConfig } from '@/utils/AppConfig';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export function generateStaticParams() {
  return AppConfig.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProviders>
      <html lang="en" className="h-full">
        <body className={`antialiased ${poppins.className}`}>{children}</body>
      </html>
    </StoreProviders>
  );
}