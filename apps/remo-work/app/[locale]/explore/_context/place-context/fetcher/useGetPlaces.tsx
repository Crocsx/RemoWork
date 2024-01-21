'use client';

import { useCallback } from 'react';

import { PlacesGetRequest, Place } from '~workspace/lib/feature/place';
import {
  createQueryString,
  useApiRequestLazy,
} from '~workspace/lib/shared/utils';

export const useGetPlaces = () => {
  const {
    data: places,
    loading,
    error,
    execute,
  } = useApiRequestLazy<Place[]>();

  const loadPlaces = useCallback(
    (payload?: PlacesGetRequest) => {
      execute(`/api/places${payload ? `?${createQueryString(payload)}` : ``}`);
    },
    [execute]
  );

  return { places, loading, error, loadPlaces };
};
