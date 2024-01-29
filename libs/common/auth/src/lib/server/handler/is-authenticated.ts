import * as Sentry from '@sentry/nextjs';
import { auth } from 'firebase-admin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const isAuthenticated = async () => {
  try {
    const tokenID = cookies().get('session')?.value;

    if (!tokenID) {
      return {
        user: null,
        error: NextResponse.json(
          { error: 'shared.api.error.unauthorized' },
          { status: 401 }
        ),
      };
    }

    const decodedClaims = await auth().verifyIdToken(tokenID, true);

    if (!decodedClaims) {
      return {
        user: null,
        error: NextResponse.json(
          { error: 'shared.api.error.unauthorized' },
          { status: 401 }
        ),
      };
    }

    return {
      user: decodedClaims,
    };
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return {
      user: null,
      error: NextResponse.json(
        { error: 'shared.api.error.internalError' },
        { status: 500 }
      ),
    };
  }
};
