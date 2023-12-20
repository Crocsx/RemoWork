'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';

import { Place, ReadPlacesRequest } from '~workspace/lib/feature/place';
import {
  createQueryString,
  useApiRequestLazy,
} from '~workspace/lib/shared/utils';

import { PlaceContext } from './place-context';
import { useAxiosCtx } from 'apps/remo-work/src/context';

export const PlaceProvider = ({ children }: React.PropsWithChildren<{}>) => {
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
    if (Object.keys(filters).length !== 0) {
      loadPlaces(filters);
    }
  }, [filters]);

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
