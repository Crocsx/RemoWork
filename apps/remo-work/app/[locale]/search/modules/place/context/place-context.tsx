'use client';

import { createContext, useContext } from 'react';

import { Place, ReadPlacesRequest } from '~workspace/lib/feature/place';

export type PlaceContextType = {
  readonly places: Place[];
  readonly selectedPlaceId: string | null;
  readonly setSelectedPlaceId: (place: string) => void;
  readonly setFilters: (places: ReadPlacesRequest) => void;
  readonly filters: ReadPlacesRequest;
  readonly loading: boolean;
  readonly error: unknown;
};

export const PlaceContext = createContext<PlaceContextType>({
  setFilters: () => null,
  places: [],
  loading: false,
  error: null,
  filters: {},
  selectedPlaceId: null,
  setSelectedPlaceId: () => null,
});

export function usePlaceCtx(): PlaceContextType {
  return useContext(PlaceContext);
}
