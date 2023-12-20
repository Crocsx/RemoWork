import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { NextResponse } from 'next/server';
import geohash from 'ngeohash';

import { FirestorePlace, Place } from '../../../shared';

export async function readPlaces(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const southParam = searchParams.get('south');
    const northParam = searchParams.get('north');
    const westParam = searchParams.get('west');
    const eastParam = searchParams.get('east');
    const wifiAvailability = searchParams.get('wifiAvailability');
    const wifiSpeed = searchParams.get('wifiSpeed');
    const noiseLevel = searchParams.get('noiseLevel');
    const talkingAllowed = searchParams.get('talkingAllowed');
    const plugsQuantity = searchParams.get('plugsQuantity');
    const comfortLevel = searchParams.get('comfortLevel');
    const priceModel = searchParams.get('priceModel');

    if (!southParam || !northParam || !westParam || !eastParam) {
      return NextResponse.json(
        { error: 'place.api.error.boundsNotProvided' },
        { status: 400 }
      );
    }

    const south = parseFloat(southParam);
    const north = parseFloat(northParam);
    const west = parseFloat(westParam);
    const east = parseFloat(eastParam);

    // Validate bounds are valid numbers
    if (isNaN(south) || isNaN(north) || isNaN(west) || isNaN(east)) {
      return NextResponse.json(
        { error: 'place.api.error.invalidBounds' },
        { status: 400 }
      );
    }

    const minGeohash = geohash.encode(south, west);
    const maxGeohash = geohash.encode(north, east);

    let query = firestore()
      .collection('places')
      .where('geohash', '>=', minGeohash)
      .where('geohash', '<=', maxGeohash);

    // Apply additional filters if they exist
    if (wifiAvailability) {
      query = query.where('wifiAvailability', '==', wifiAvailability);
    }
    if (wifiSpeed) {
      query = query.where('wifiSpeed', '==', wifiSpeed);
    }
    if (noiseLevel) {
      query = query.where('noiseLevel', '==', noiseLevel);
    }
    if (talkingAllowed) {
      query = query.where('talkingAllowed', '==', talkingAllowed);
    }
    if (plugsQuantity) {
      query = query.where('plugsQuantity', '==', plugsQuantity);
    }
    if (comfortLevel) {
      query = query.where('comfortLevel', '==', comfortLevel);
    }
    if (priceModel) {
      query = query.where('priceModel', '==', priceModel);
    }

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
