import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { NextResponse } from 'next/server';
import geohash from 'ngeohash';

import { PlaceUpdateRequest, PlaceUpdateResponse } from '../../../shared';

export async function placeUpdate(
  req: Request,
  user: DecodedIdToken,
  { params }: { params: { placeId: string } }
) {
  try {
    const id = params.placeId;
    const {
      latitude,
      longitude,
      id: _,
      ...place
    }: PlaceUpdateRequest = await req.json();

    if (!id || typeof id !== 'string') {
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
    const docRef = await collectionRef.doc(id).get();

    if (!docRef.exists) {
      return NextResponse.json(
        { error: 'shared.api.error.notFound' },
        { status: 404 }
      );
    }

    docRef.ref.update({
      ...place,
      id,
      geohash: geohash.encode(latitude, longitude),
      updatedAt: Date.now(),
      updatedBy: user.uid,
    });

    const updatedDoc = await docRef.ref.get();

    return NextResponse.json<PlaceUpdateResponse>(
      updatedDoc.data() as PlaceUpdateResponse,
      {
        status: 200,
      }
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
