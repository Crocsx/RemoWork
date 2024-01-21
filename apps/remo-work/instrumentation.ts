export async function register() {
  if (process.env['NEXT_RUNTIME'] === 'nodejs') {
    const admin = await await import('firebase-admin');
    const initFirebaseAdmin = (
      await import('~workspace/lib/external/firebase/server')
    ).initFirebaseAdmin;
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
  }
}
