import * as Sentry from '@sentry/nextjs';
import * as admin from 'firebase-admin';

const initFirebaseAdmin = async (config: admin.AppOptions) => {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({ ...config });
    }
  } catch (e) {
    Sentry.captureException(e);
  }
};

initFirebaseAdmin({
  credential: admin.credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_FIREBASE_ADMIN_PRIVATE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_FIREBASE_ADMIN_PRIVATE_KEY.replace(
      /\\n/g,
      '\n'
    ),
  }),
});
