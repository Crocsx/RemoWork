import * as Sentry from '@sentry/nextjs';
import { auth } from 'firebase-admin';
import { NextResponse } from 'next/server';

export const isAuthenticated = async (req: Request) => {
  try {
    const tokenId = req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!tokenId) {
      return NextResponse.json(
        { error: 'shared.api.error.unauthorized' },
        { status: 401 }
      );
    }

    const decodedClaims = await auth().verifyIdToken(tokenId, true);

    if (!decodedClaims) {
      return NextResponse.json(
        { error: 'shared.api.error.unauthorized' },
        { status: 401 }
      );
    }

    return null;
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return NextResponse.json(
      { error: 'shared.api.error.internalError' },
      { status: 500 }
    );
  }
};
