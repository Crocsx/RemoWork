import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { NextResponse } from 'next/server';

export async function readPlace(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'place.api.error.idRequired' },
        { status: 400 }
      );
    }

    const collectionRef = firestore().collection('places');
    const docSnapshot = await collectionRef.doc(id).get();

    if (!docSnapshot.exists) {
      return NextResponse.json(
        { error: 'shared.api.error.notFound' },
        { status: 404 }
      );
    }

    const placeData = docSnapshot.data();

    return NextResponse.json(placeData, { status: 200 });
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return NextResponse.json(
      { error: 'shared.api.error.internalError' },
      { status: 500 }
    );
  }
}
