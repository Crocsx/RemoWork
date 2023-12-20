import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { NextResponse } from 'next/server';
import geohash from 'ngeohash';

import { Place } from '../../../shared/types';

export async function updatePlace(req: Request) {
  try {
    const { latitude, longitude, ...place }: Place = await req.json();

    if (!place.id) {
      return NextResponse.json(
        { error: 'place.api.error.idRequired' },
        { status: 400 }
      );
    }

    if (!place.name) {
      return NextResponse.json(
        { error: 'place.api.error.nameRequired' },
        { status: 400 }
      );
    }

    if (!longitude || !latitude) {
      return NextResponse.json(
        { error: 'place.api.error.locationRequired' },
        { status: 400 }
      );
    }

    const collectionRef = firestore().collection('places');
    const docRef = await collectionRef.doc(place.id).get();

    if (!docRef.exists) {
      return NextResponse.json(
        { error: 'shared.api.error.notFound' },
        { status: 404 }
      );
    }

    docRef.ref.update({
      ...place,
      geohash: geohash.encode(latitude, longitude),
      updatedAt: Date.now(),
    });

    return NextResponse.json(docRef.data(), {
      status: 200,
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return NextResponse.json(
      { error: 'shared.api.error.internalError' },
      { status: 500 }
    );
  }
}
