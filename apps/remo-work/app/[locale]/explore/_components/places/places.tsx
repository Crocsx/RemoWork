'use client';

import {
  useMapCtx,
  usePlaceCtx,
} from '~workspace/app/remo-work/app/explore/_context';

import { PlaceDetails } from './place-details';
import { PlacesExplorer } from './places-explorer';

export const Places = () => {
  const { service } = useMapCtx();
  const { selectedPlaceId } = usePlaceCtx();

  return !selectedPlaceId ? (
    <PlacesExplorer />
  ) : (
    <PlaceDetails placeId={selectedPlaceId} service={service} />
  );
};
