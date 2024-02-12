'use client';

import Univers from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';

import Navigation from './components/Navigation';

import './globals.css';

import { useLockBodyScroll } from './store/modalStore';
import { siteConfig } from './site.config';

const univers = Univers({
  variable: '--font-univers',
  display: 'swap',
  src: [
    {
      path: '/font/univers.ttf',
      weight: '400',
      style: 'normal',
    }
  ]
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useLockBodyScroll();
  return (
    <html lang="en" className={univers.className}>
      <body>
        <Navigation />
        <main className="py-12 pt-24">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
