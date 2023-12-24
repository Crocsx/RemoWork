'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { LoadingOverlay } from '@mantine/core';
import { useJsApiLoader, UseLoadScriptOptions } from '@react-google-maps/api';
import * as Sentry from '@sentry/nextjs';

import { notifications } from '~workspace/lib/shared/ui';

import { DEFAULT_LOCATION, MapContext } from './map-context';

export const MapProvider = ({
  options,
  children,
}: React.PropsWithChildren<{ options: UseLoadScriptOptions }>) => {
  const { isLoaded, loadError } = useJsApiLoader(options);
  const [map, setMap] = useState<google.maps.Map | undefined>(undefined);
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral>(DEFAULT_LOCATION);
  const service = useMemo(
    () => map && new google.maps.places.PlacesService(map),
    [map]
  );

  useEffect(() => {
    if (loadError) {
      Sentry.captureException(loadError);
      notifications.error({
        title: loadError?.name,
        message: loadError?.message,
      });
    }
  }, [loadError]);

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        currentLocation,
        setCurrentLocation,
        service,
      }}
    >
      <LoadingOverlay visible={!isLoaded} />
      {isLoaded && children}
    </MapContext.Provider>
  );
};
