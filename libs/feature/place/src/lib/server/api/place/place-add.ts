import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { NextResponse } from 'next/server';
import geohash from 'ngeohash';

import { PlaceAddRequest, PlaceAddResponse } from '../../../shared';

export function assignTypes<T extends object>() {
  return {
    toFirestore(doc: T): firestore.DocumentData {
      return doc;
    },
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): T {
      return snapshot.data()! as T;
    },
  };
}
export async function placeAdd(req: Request, user: DecodedIdToken) {
  try {
    const { longitude, latitude, ...place }: PlaceAddRequest = await req.json();

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

    await documentRef.set({
      ...place,
      geohash: geohash.encode(latitude, longitude),
      createdAt: Date.now(),
      createdBy: user.uid,
    });

    return NextResponse.json<PlaceAddResponse>(
      (await documentRef.get()).data() as PlaceAddResponse,
      {
        status: 201,
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
