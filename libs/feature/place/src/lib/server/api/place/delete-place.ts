import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { NextResponse } from 'next/server';

export async function deletePlace(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'place.api.error.idRequired' },
        { status: 400 }
      );
    }

    const collectionRef = firestore().collection('places');
    const docRef = await collectionRef.doc(id).get();

    if (!docRef.exists) {
      return NextResponse.json(
        { error: 'shared.api.error.notFound' },
        { status: 404 }
      );
    }

    await docRef.ref.delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return NextResponse.json(
      { error: 'shared.api.error.internalError' },
      { status: 500 }
    );
  }
}
