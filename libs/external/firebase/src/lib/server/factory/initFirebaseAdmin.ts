import * as Sentry from '@sentry/nextjs';
import * as admin from 'firebase-admin';

export const initFirebaseAdmin = (config: admin.AppOptions): boolean => {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({ ...config });
    }

    return true;
  } catch (e) {
    Sentry.captureException(e);
    return false;
  }
};
