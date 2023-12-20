'use client';

import { createContext, useContext } from 'react';

import { Place, ReadPlacesRequest } from '~workspace/lib/feature/place';

export type PlaceContextType = {
  readonly places: Place[];
  readonly setFilters: (places: ReadPlacesRequest) => void;
  readonly filters: ReadPlacesRequest;
  loading: boolean;
  error: unknown;
};

export const PlaceContext = createContext<PlaceContextType>({
  setFilters: () => null,
  places: [],
  loading: false,
  error: null,
  filters: {},
});

export function usePlaceCtx(): PlaceContextType {
  return useContext(PlaceContext);
}
