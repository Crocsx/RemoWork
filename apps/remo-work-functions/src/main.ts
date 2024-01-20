import functions from 'firebase-functions';
import admin from 'firebase-admin';

import { initFirebaseAdmin } from '~workspace/lib/external/firebase/server';

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

export const createUser = functions.auth.user().onCreate((user) => {
  const { uid } = user;

  const userCollection = admin.firestore().collection('users');

  userCollection.doc(uid).set({
    email: user.email,
    username: user.displayName,
    avatar: user.photoURL,
  });
});
