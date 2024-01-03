import { getRequestConfig } from 'next-intl/server';

import { TimezoneUtils } from '~workspace/lib/shared/utils';

import { messageLoader } from './i18n';

export default getRequestConfig(async ({ locale }) => ({
  messages: await messageLoader(locale),
  timeZone: TimezoneUtils.getRecommendedTimezone(),
}));
