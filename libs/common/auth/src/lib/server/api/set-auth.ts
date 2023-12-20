import * as Sentry from '@sentry/nextjs';
import { auth } from 'firebase-admin';
import { NextResponse } from 'next/server';

export async function setAuth(req: Request) {
  try {
    const { tokenId } = await req.json();

    if (!tokenId) {
      return NextResponse.json(
        { error: 'auth.api.error.tokenInvalid' },
        { status: 401 }
      );
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth().createSessionCookie(tokenId, {
      expiresIn,
    });
    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      sameSite: true,
      secure: true,
    };

    const response = NextResponse.json({}, { status: 200 });
    response.cookies.set(options);
    return response;
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return Response.json(
      { error: 'shared.api.error.internalError' },
      { status: 500 }
    );
  }
}
