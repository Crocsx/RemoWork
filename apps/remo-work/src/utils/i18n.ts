
export const messageLoader = async (locale: string) => {
  return {
    ...(await import(`../../locales/${locale}.json`)).default,
    ...(await import(`../../../../libs/common/auth/src/lib/shared/locales/${locale}.json`)).default,
    ...(await import(`../../../../libs/feature/place/src/lib/shared/locales/${locale}.json`)).default,
    ...(await import(`../../../../libs/shared/ui/src/lib/locales/${locale}.json`)).default
  };
};
