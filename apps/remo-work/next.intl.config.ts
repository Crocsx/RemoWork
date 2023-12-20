import MiddlewareConfig from 'next-intl/dist/types/src/middleware/NextIntlMiddlewareConfig';

type IntlLocales = ['en-US'];
export type IntlLocale = 'en-US';

export const intlConfig: MiddlewareConfig<IntlLocales> = {
  locales: ['en-US'],
  defaultLocale: 'en-US',
  localePrefix: 'as-needed',
};
