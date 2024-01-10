import * as Sentry from '@sentry/nextjs';
import * as admin from 'firebase-admin';

export const initFirebaseAdmin = async (
  config: admin.AppOptions
): Promise<boolean> => {
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
