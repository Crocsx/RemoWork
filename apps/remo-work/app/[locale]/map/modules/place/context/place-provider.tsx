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

export const PlaceProvider = ({
  children,
  maxZoom,
}: React.PropsWithChildren<{ maxZoom: number }>) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filters, setFilters] = useState<ReadPlacesRequest>({});
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
    const { zoom, ...rest } = filters;
    if (Object.keys(rest).length !== 0 && maxZoom <= Number(zoom)) {
      loadPlaces(filters);
    }
  }, [filters, loadPlaces, maxZoom]);

  return (
    <PlaceContext.Provider
      value={{
        places,
        setFilters,
        filters,
        loading,
        error,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};
