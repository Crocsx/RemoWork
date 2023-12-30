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

    const { filters, sortBy, page = 1, perPage = 50 } = requestParams;

    const query = firestore().collection('places');

    if (filters.south && filters.north && filters.west && filters.east) {
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
      query
        .where('geohash', '>=', minGeohash)
        .where('geohash', '<=', maxGeohash);
    }

    if (filters.wifiAvailability) {
      query.where('wifiAvailability', '==', filters.wifiAvailability);
    }
    if (filters.wifiSpeed) {
      query.where('wifiSpeed', '==', filters.wifiSpeed);
    }
    if (filters.noiseLevel) {
      query.where('noiseLevel', '==', filters.noiseLevel);
    }
    if (filters.talkingAllowed) {
      query.where('talkingAllowed', '==', filters.talkingAllowed);
    }
    if (filters.plugsQuantity) {
      query.where('plugsQuantity', '==', filters.plugsQuantity);
    }
    if (filters.comfortLevel) {
      query.where('comfortLevel', '==', filters.comfortLevel);
    }
    if (filters.priceModel) {
      query.where('priceModel', '==', filters.priceModel);
    }
    if (filters.meetingSpace) {
      query.where('meetingSpace', '==', filters.meetingSpace);
    }
    if (sortBy?.key) {
      query.orderBy(sortBy.key, sortBy.dir === 'desc' ? 'desc' : 'asc');
    }

    const startAt = (page - 1) * perPage;
    query.startAt(startAt).limit(perPage);
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
