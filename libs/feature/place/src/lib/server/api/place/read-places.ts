import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { NextResponse } from 'next/server';
import geohash from 'ngeohash';

import { readQueryString } from '~workspace/lib/shared/utils';

import { FirestorePlace, Place, ReadPlacesRequest } from '../../../shared';

export async function readPlaces(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestParams = readQueryString<ReadPlacesRequest>(searchParams);

    const { filters, sortBy, fromDocId, perPage = 20 } = requestParams;

    let query: firestore.Query<firestore.DocumentData, firestore.DocumentData> =
      firestore().collection('places');

    if (filters?.south && filters?.north && filters?.west && filters?.east) {
      if (
        isNaN(filters.south) ||
        isNaN(filters.north) ||
        isNaN(filters.west) ||
        isNaN(filters.east)
      ) {
        return NextResponse.json(
          { error: 'place.api.error.invalidBounds' },
          { status: 400 }
        );
      }

      const minGeohash = geohash.encode(filters.south, filters.west);
      const maxGeohash = geohash.encode(filters.north, filters.east);
      query = query
        .where('geohash', '>=', minGeohash)
        .where('geohash', '<=', maxGeohash);
    }

    if (filters?.wifiAvailability) {
      query = query.where('wifiAvailability', '==', filters.wifiAvailability);
    }
    if (filters?.wifiSpeed) {
      query = query.where('wifiSpeed', '==', filters.wifiSpeed);
    }
    if (filters?.noiseLevel) {
      query = query.where('noiseLevel', '==', filters.noiseLevel);
    }
    if (filters?.talkingAllowed) {
      query = query.where('talkingAllowed', '==', filters.talkingAllowed);
    }
    if (filters?.plugsQuantity) {
      query = query.where('plugsQuantity', '==', filters.plugsQuantity);
    }
    if (filters?.comfortLevel) {
      query = query.where('comfortLevel', '==', filters.comfortLevel);
    }
    if (filters?.priceModel) {
      query = query.where('priceModel', '==', filters.priceModel);
    }
    if (filters?.meetingSpace) {
      query = query.where('meetingSpace', '==', filters.meetingSpace);
    }
    if (sortBy?.field) {
      query = query.orderBy(
        sortBy.field,
        sortBy.dir === 'desc' ? 'desc' : 'asc'
      );
    }
    if (fromDocId) {
      const lastDoc = await firestore()
        .collection('places')
        .doc(fromDocId)
        .get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    query = query.limit(perPage);
    const querySnapshot = await query.get();

    const places: Place[] = [];
    querySnapshot.forEach((doc) => {
      const placeData = doc.data() as FirestorePlace;
      const { latitude, longitude } = geohash.decode(placeData.geohash);
      places.push({
        latitude,
        longitude,
        ...placeData,
      });
    });
    console.log(places);
    return NextResponse.json(places, { status: 200 });
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return NextResponse.json(
      { error: 'shared.api.error.internalError' },
      { status: 500 }
    );
  }
}
