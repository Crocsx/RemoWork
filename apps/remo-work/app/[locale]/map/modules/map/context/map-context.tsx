'use client';

import { createContext, useContext } from 'react';

export const DEFAULT_LOCATION = {
  lat: 41.85,
  lng: -87.65,
};

export type MapContextType = {
  readonly map?: google.maps.Map;
  readonly currentLocation: google.maps.LatLngLiteral;
  readonly setMap?: (map?: google.maps.Map) => void;
  readonly setCurrentLocation: (
    currentLocation: google.maps.LatLngLiteral
  ) => void;
  readonly service?: google.maps.places.PlacesService;
};

export const MapContext = createContext<MapContextType>({
  setCurrentLocation: () => null,
  currentLocation: DEFAULT_LOCATION,
});

export function useMapCtx(): MapContextType {
  return useContext(MapContext);
}
