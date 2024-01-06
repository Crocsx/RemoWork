import { ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { notFound } from 'next/navigation';

import './global.css';

export { metadata } from './metadata';
import Providers from './providers';
import { IntlLocale, intlConfig } from '../../next.intl.config';

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode[];
  params: { locale: IntlLocale };
}) {
  if (!intlConfig.locales.includes(locale)) notFound();

  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <body style={{ background: 'var(--mantine-color-secondary-0)' }}>
        <Providers locale={locale}>
          {children}
          <Notifications />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
