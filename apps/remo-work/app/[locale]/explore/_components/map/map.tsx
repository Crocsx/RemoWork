'use client';
import { useCallback, useEffect } from 'react';

import { Alert, useMantineTheme } from '@mantine/core';
import { GoogleMap } from '@react-google-maps/api';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import {
  CurrentLocationMarker,
  Hud,
  useMapBoundsChanged,
} from '~workspace/lib/feature/map';

import { MAX_ZOOM } from '~workspace/app/remo-work/app/explore/_config';
import {
  DEFAULT_LOCATION,
  useMapCtx,
  usePlaceCtx,
} from '~workspace/app/remo-work/app/explore/_context';

import { PlacesMarker } from './places-marker';
export function Map() {
  const theme = useMantineTheme();
  const t = useTranslations();
  const { setMap, map, setCurrentLocation } = useMapCtx();
  const { setFilters, filters } = usePlaceCtx();
  const bounds = useMapBoundsChanged(map);

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

  useEffect(() => {
    const ne = bounds?.getNorthEast();
    const sw = bounds?.getSouthWest();

    if (ne && sw)
      setFilters({
        ...filters,
        zoom: map?.getZoom(),
        north: ne.lat(),
        south: sw.lat(),
        east: ne.lng(),
        west: sw.lng(),
      });
  }, [bounds, setFilters]);

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
        {(map?.getZoom() || 0) < MAX_ZOOM && (
          <Alert
            mt="xl"
            color="yellow"
            title={t('core.page.explore.map.notification.maxZoom.title')}
            pos="absolute"
            p="md"
            left="25%"
            right="25%"
            mx="auto"
            variant="filled"
            icon={<IconAlertTriangle />}
          >
            {t('core.page.explore.map.notification.maxZoom.description')}
          </Alert>
        )}
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
