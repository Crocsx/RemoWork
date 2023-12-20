import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { NextResponse } from 'next/server';
import geohash from 'ngeohash';

import { Place } from '../../../shared';

export async function createPlace(req: Request) {
  try {
    const { longitude, latitude, ...place }: Place = await req.json();

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
    const documentRef = collectionRef.doc(place.id);

    const existingDoc = await documentRef.get();
    if (existingDoc.exists) {
      return NextResponse.json(
        { error: 'shared.api.error.alreadyExist' },
        { status: 409 }
      );
    }

    const response = await documentRef.set({
      ...place,
      geohash: geohash.encode(latitude, longitude),
      createAt: Date.now(),
      updatedAt: Date.now(),
    });

    return NextResponse.json(response, {
      status: 201,
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
