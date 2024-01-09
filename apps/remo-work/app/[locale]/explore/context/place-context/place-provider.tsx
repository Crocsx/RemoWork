'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useQueryState, parseAsJson } from 'next-usequerystate';

import { Place, ReadPlacesRequest } from '~workspace/lib/feature/place';
import {
  FetchInstance,
  createQueryString,
  useApiRequestLazy,
} from '~workspace/lib/shared/utils';

import { PlaceContext } from '.';

export const PlaceProvider = ({
  children,
  maxZoom,
}: React.PropsWithChildren<{ maxZoom: number }>) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filters, setFilters] = useQueryState(
    'search',
    parseAsJson<ReadPlacesRequest['filters']>()
  );
  const [selectedPlaceId, setSelectedPlaceId] = useQueryState('placeId', {
    history: 'push',
  });

  const {
    loading,
    error,
    execute: loadPlaces,
  } = useApiRequestLazy({
    onSuccess: useCallback(
      (response: Place[]) => {
        setPlaces(response);
      },
      [setPlaces]
    ),
    operation: useCallback((filters: ReadPlacesRequest) => {
      const params = createQueryString(filters);
      return FetchInstance.get<Place[]>(`/places?${params}`);
    }, []),
  });

  useEffect(() => {
    const current = filters || {};
    const { zoom, ...rest } = current;
    if (Object.keys(rest).length !== 0 && maxZoom <= Number(zoom)) {
      loadPlaces({
        filters: {
          ...current,
        },
      });
    }
  }, [filters, loadPlaces, maxZoom]);

  return (
    <PlaceContext.Provider
      value={{
        places,
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
