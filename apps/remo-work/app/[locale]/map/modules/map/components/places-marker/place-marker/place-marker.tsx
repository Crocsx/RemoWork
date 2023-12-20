import { useMemo } from 'react';

import { Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InfoWindow, Marker } from '@react-google-maps/api';

import { Place, PlaceDescription } from '~workspace/lib/feature/place';

export const PlaceMarker = ({
  place,
  service,
}: {
  place: Place;
  service?: google.maps.places.PlacesService;
}) => {
  const [opened, { open, close }] = useDisclosure();

  const position = useMemo(() => {
    return new google.maps.LatLng({
      lat: place.latitude,
      lng: place.longitude,
    });
  }, [place.latitude, place.longitude]);

  return (
    <Marker position={position} onMouseOver={open} onMouseOut={close}>
      {opened && (
        <InfoWindow>
          <Group w={240}>
            <PlaceDescription place={place} service={service} />
          </Group>
        </InfoWindow>
      )}
    </Marker>
  );
};
