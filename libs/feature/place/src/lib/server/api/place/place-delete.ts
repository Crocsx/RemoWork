import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { NextResponse } from 'next/server';

import { PlaceDeleteResponse } from '../../../shared';

export async function placeDelete(_: Request, placeId: string) {
  try {
    if (!placeId || typeof placeId !== 'string') {
      return NextResponse.json(
        { error: 'place.api.error.idRequired' },
        { status: 400 }
      );
    }

    const collectionRef = firestore().collection('places');
    const docRef = await collectionRef.doc(placeId).get();

    if (!docRef.exists) {
      return NextResponse.json(
        { error: 'shared.api.error.notFound' },
        { status: 404 }
      );
    }

    await docRef.ref.delete();
    return NextResponse.json<PlaceDeleteResponse>({ success: true });
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return NextResponse.json(
      { error: 'shared.api.error.internalError' },
      { status: 500 }
    );
  }
}
