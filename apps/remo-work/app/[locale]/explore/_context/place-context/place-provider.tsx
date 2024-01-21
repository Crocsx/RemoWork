'use client';

import React, { useEffect } from 'react';

import { useQueryState, parseAsJson } from 'next-usequerystate';

import { PlacesGetRequest } from '~workspace/lib/feature/place';

import { useGetPlaces } from './fetcher';
import { PlaceContext } from './place-context';

export const PlaceProvider = ({
  children,
  maxZoom,
}: React.PropsWithChildren<{ maxZoom: number }>) => {
  const [filters, setFilters] = useQueryState(
    'search',
    parseAsJson<PlacesGetRequest['filters']>()
  );
  const [selectedPlaceId, setSelectedPlaceId] = useQueryState('placeId', {
    history: 'push',
  });

  const { places, loading, error, loadPlaces } = useGetPlaces();

  useEffect(() => {
    const current = filters || {};
    const { zoom, ...rest } = current;
    if (Object.keys(rest).length !== 0 && maxZoom <= Number(zoom)) {
      loadPlaces({ filters: { ...current } });
    }
  }, [filters, loadPlaces, maxZoom]);

  return (
    <PlaceContext.Provider
      value={{
        places: places || [],
        setFilters,
        filters: filters || {},
        setSelectedPlaceId,
        selectedPlaceId,
        loading,
        error,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};
