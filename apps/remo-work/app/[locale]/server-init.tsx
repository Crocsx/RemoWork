import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { IntlLocale, intlConfig } from 'apps/remo-work/next.intl.config';
import { notFound } from 'next/navigation';

export default function ServerInit({
  children,
  locale,
}: {
  children: React.ReactNode | React.ReactNode[];
  locale: IntlLocale;
}) {
  if (!intlConfig.locales.includes(locale)) notFound();

  return (
    <>
      {children}
      {process.env.NEXT_PUBLIC_ENV === 'PRODUCTION' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  );
}
