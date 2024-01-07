import { useMemo } from 'react';

import { Group, MantineThemeColors, rem, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InfoWindow, Marker } from '@react-google-maps/api';

import { useMarkerStyles } from '~workspace/lib/feature/map';
import { Place, PlaceCard } from '~workspace/lib/feature/place';

export const PlaceMarker = ({
  place,
  service,
  selected,
}: {
  place: Place;
  service?: google.maps.places.PlacesService;
  selected: boolean;
}) => {
  const [opened, { open, close }] = useDisclosure();
  const theme = useMantineTheme();
  const style = useMarkerStyles({
    options: {
      icon: {
        fillColor: selected
          ? (theme.colors as MantineThemeColors)['primary']?.[6]
          : (theme.colors as MantineThemeColors)['secondary']?.[6],
        strokeColor: selected
          ? (theme.colors as MantineThemeColors)['primary']?.[8]
          : (theme.colors as MantineThemeColors)['secondary']?.[8],
      },
    },
  });
  const position = useMemo(() => {
    return new google.maps.LatLng({
      lat: place.latitude,
      lng: place.longitude,
    });
  }, [place.latitude, place.longitude]);

  return (
    <Marker
      position={position}
      onMouseOver={open}
      onMouseOut={close}
      options={style}
    >
      {opened && (
        <InfoWindow options={{ disableAutoPan: true }}>
          <Group w={rem(240)}>
            <PlaceCard place={place} service={service} />
          </Group>
        </InfoWindow>
      )}
    </Marker>
  );
};
