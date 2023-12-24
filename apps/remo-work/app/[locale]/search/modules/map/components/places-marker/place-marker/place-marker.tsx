import { useMemo } from 'react';

import { Group, rem, useMantineTheme } from '@mantine/core';
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
          ? theme.colors[theme.primaryColor]?.[6]
          : theme.colors[theme.black]?.[6],
        strokeColor: theme.colors[theme.black]?.[6],
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
        <InfoWindow>
          <Group w={rem(240)}>
            <PlaceCard place={place} service={service} />
          </Group>
        </InfoWindow>
      )}
    </Marker>
  );
};
