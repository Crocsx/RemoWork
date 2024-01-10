import { ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import './global.css';

export { metadata } from './metadata';

import ClientInit from './client-init';
import ServerInit from './server-init';
import { IntlLocale } from '../../next.intl.config';

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode[];
  params: { locale: IntlLocale };
}) {
  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <body style={{ background: 'var(--mantine-color-secondary-0)' }}>
        <ServerInit locale={locale}>
          <ClientInit locale={locale}>
            {children}
            <Notifications />
          </ClientInit>
        </ServerInit>
      </body>
    </html>
  );
}
