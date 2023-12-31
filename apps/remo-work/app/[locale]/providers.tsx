'use client';

import { MantineProvider } from '@mantine/core';
import { NextIntlClientProvider } from 'next-intl';

import { AuthProvider } from '~workspace/lib/common/auth';
import { FirebaseProvider } from '~workspace/lib/external/firebase';
import { AxiosProvider, TimezoneUtils } from '~workspace/lib/shared/utils';

import { messageLoader, themeBlue } from '~workspace/app/remo-work/src';

export default async function Providers({
  children,
  locale,
}: {
  children: React.ReactNode[];
  locale: string;
}) {
  const messages = await messageLoader(locale);

  return (
    <MantineProvider theme={themeBlue}>
      <FirebaseProvider
        config={{
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId:
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        }}
      >
        <AuthProvider>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone={TimezoneUtils.getRecommendedTimezone()}
          >
            <AxiosProvider
              config={{
                baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
              }}
            >
              {children}
            </AxiosProvider>
          </NextIntlClientProvider>
        </AuthProvider>
      </FirebaseProvider>
    </MantineProvider>
  );
}
