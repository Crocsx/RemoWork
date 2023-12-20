import createMiddleware from 'next-intl/middleware';

import { intlConfig } from './next.intl.config';

export default createMiddleware(intlConfig);

export const config = {
  matcher: [
    // Make sure the root of your base path is matched
    '/',
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
