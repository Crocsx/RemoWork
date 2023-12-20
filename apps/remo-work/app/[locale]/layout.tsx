import { ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { notFound } from 'next/navigation';

import './global.css';

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
      <body className="bg-primary-3">
        <Providers locale={locale}>
          {children}
          <Notifications />
        </Providers>
      </body>
    </html>
  );
}
