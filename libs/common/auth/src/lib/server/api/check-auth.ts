import * as Sentry from '@sentry/nextjs';
import { auth } from 'firebase-admin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function checkAuth(_: Request) {
  try {
    const session = cookies().get('session')?.value || '';

    if (!session) {
      return NextResponse.json(
        { error: 'shared.api.error.unauthorized' },
        { status: 401 }
      );
    }

    const decodedClaims = await auth().verifySessionCookie(session, true);

    if (!decodedClaims) {
      return NextResponse.json(
        { error: 'shared.api.error.unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({ isLogged: true }, { status: 200 });
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return Response.json(
      { error: 'shared.api.error.internalError' },
      { status: 500 }
    );
  }
}
