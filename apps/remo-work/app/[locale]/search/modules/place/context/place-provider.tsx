'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useAxiosCtx } from 'apps/remo-work/src/context';
import { AxiosResponse } from 'axios';

import { Place, ReadPlacesRequest } from '~workspace/lib/feature/place';
import {
  createQueryString,
  useApiRequestLazy,
} from '~workspace/lib/shared/utils';

import { PlaceContext } from './place-context';
import { useQueryState, parseAsJson, parseAsString } from 'next-usequerystate';

export const PlaceProvider = ({
  children,
  maxZoom,
}: React.PropsWithChildren<{ maxZoom: number }>) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filters, setFilters] = useQueryState(
    'search',
    parseAsJson<ReadPlacesRequest>()
  );
  const [selectedPlaceId, setSelectedPlaceId] = useQueryState('placeId', {
    history: 'push',
  });
  const axios = useAxiosCtx();

  const {
    loading,
    error,
    execute: loadPlaces,
  } = useApiRequestLazy({
    onSuccess: useCallback(
      (response: AxiosResponse<Place[]>) => {
        setPlaces(response.data);
      },
      [setPlaces]
    ),
    operation: useCallback(
      (filters: ReadPlacesRequest) => {
        const params = createQueryString(filters);
        return axios.get(`/places?${params}`);
      },
      [axios]
    ),
  });

  useEffect(() => {
    const current = filters || {};
    const { zoom, ...rest } = current;
    if (Object.keys(rest).length !== 0 && maxZoom <= Number(zoom)) {
      loadPlaces(current);
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
