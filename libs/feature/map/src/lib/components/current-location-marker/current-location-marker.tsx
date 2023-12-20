import { useCallback, useEffect, useState } from 'react';

import { MantineTheme } from '@mantine/core';

import { notifications } from '~workspace/lib/shared/ui';

import { UserAccuracy } from './user-accuracy';
import { UserLocation } from './user-location';

export const CurrentLocationMarker = ({
  theme,
  map,
  onCurrentLocationChange,
}: {
  theme: MantineTheme;
  map: google.maps.Map;
  onCurrentLocationChange?: (pos: GeolocationPosition) => void;
}) => {
  const [position, setPosition] = useState<google.maps.LatLng>();
  const [accuracy, setAccuracy] = useState<number>(0);

  const moveMarker = useCallback(
    (geoPosition: GeolocationPosition) => {
      onCurrentLocationChange?.(geoPosition);
      setAccuracy(geoPosition.coords.accuracy);
      setPosition(
        new google.maps.LatLng({
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude,
        })
      );
    },
    [onCurrentLocationChange]
  );

  useEffect(() => {
    if (!map) return;

    if (!navigator.geolocation) {
      notifications.error({
        title: 'Error',
        message: `Your browser doesn't support geolocation.`,
      });
      return;
    }

    const watchId = navigator.geolocation.watchPosition(moveMarker);

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [map, moveMarker]);

  if (!position) {
    return;
  }
  return (
    <>
      <UserLocation position={position} theme={theme} />
      <UserAccuracy position={position} accuracy={accuracy} theme={theme} />
    </>
  );
};
