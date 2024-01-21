'use client';

import { createContext, useContext } from 'react';

import { Place, PlacesGetRequest } from '~workspace/lib/feature/place';

export type PlaceContextType = {
  readonly places: Place[];
  readonly selectedPlaceId: string | null;
  readonly setSelectedPlaceId: (place: string) => void;
  readonly setFilters: (places: PlacesGetRequest['filters']) => void;
  readonly filters: PlacesGetRequest['filters'];
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
