import * as Sentry from '@sentry/nextjs';
import { auth } from 'firebase-admin';
import { NextResponse } from 'next/server';

export const isAuthenticated = async (req: Request) => {
  try {
    const tokenId = req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!tokenId) {
      return {
        user: null,
        error: NextResponse.json(
          { error: 'shared.api.error.unauthorized' },
          { status: 401 }
        ),
      };
    }

    const decodedClaims = await auth().verifyIdToken(tokenId, true);

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
