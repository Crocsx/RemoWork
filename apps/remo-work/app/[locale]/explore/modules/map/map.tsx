'use client';
import { useCallback } from 'react';

import { useMantineTheme } from '@mantine/core';
import { GoogleMap } from '@react-google-maps/api';

import { CurrentLocationMarker, Hud } from '~workspace/lib/feature/map';

import { PlacesMarker } from './components';
import { DEFAULT_LOCATION, useMapCtx } from './context';

export function Map() {
  const theme = useMantineTheme();
  const { setMap, map, setCurrentLocation } = useMapCtx();
  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setMap?.(map);
    },
    [setMap]
  );

  const onUnmount = useCallback(() => {
    setMap?.(undefined);
  }, [setMap]);

  const currentLocationChangeHandler = useCallback(
    (pos: GeolocationPosition) => {
      setCurrentLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    },
    [setCurrentLocation]
  );

  return (
    <>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          disableDefaultUI: true,
          minZoom: 7,
          styles: [
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'poi.attraction',
              stylers: [{ visibility: 'off' }],
            },
          ],
        }}
        center={DEFAULT_LOCATION}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {map && (
          <>
            <Hud map={map} />
            <CurrentLocationMarker
              theme={theme}
              map={map}
              onCurrentLocationChange={currentLocationChangeHandler}
            />
            <PlacesMarker />
          </>
        )}
      </GoogleMap>
    </>
  );
}
