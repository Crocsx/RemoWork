import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { NextResponse } from 'next/server';
import geohash from 'ngeohash';

import { FirestorePlace, PlaceGetResponse } from '../../../shared';

export async function placeGet(
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
    const docSnapshot = await collectionRef.doc(id).get();

    if (!docSnapshot.exists) {
      return NextResponse.json(
        { error: 'shared.api.error.notFound' },
        { status: 404 }
      );
    }

    const placeData = docSnapshot.data() as FirestorePlace;
    const { latitude, longitude } = geohash.decode(placeData.geohash);

    return NextResponse.json<PlaceGetResponse>(
      {
        latitude,
        longitude,
        ...placeData,
      },
      { status: 200 }
    );
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return NextResponse.json(
      { error: 'shared.api.error.internalError' },
      { status: 500 }
    );
  }
}
