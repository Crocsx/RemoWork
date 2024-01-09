'use client';

import { useEffect } from 'react';

import { useMapBoundsChanged } from '~workspace/lib/feature/map';

import { PlaceDetails } from './place-details';
import { PlacesExplorer } from './places-explorer';
import { useMapCtx, usePlaceCtx } from '../../context';

export const Places = () => {
  const { map, service } = useMapCtx();
  const { setFilters, filters, selectedPlaceId } = usePlaceCtx();
  const bounds = useMapBoundsChanged(map);

  useEffect(() => {
    const ne = bounds?.getNorthEast();
    const sw = bounds?.getSouthWest();

    if (ne && sw)
      setFilters({
        ...filters,
        zoom: map?.getZoom(),
        north: ne.lat(),
        south: sw.lat(),
        east: ne.lng(),
        west: sw.lng(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds, setFilters]);

  return !selectedPlaceId ? (
    <PlacesExplorer />
  ) : (
    <PlaceDetails placeId={selectedPlaceId} service={service} />
  );
};
