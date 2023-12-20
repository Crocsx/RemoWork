import { useCallback, useEffect } from 'react';

import { Button } from '@mantine/core';
import { IconLocation } from '@tabler/icons-react';

import { notifications } from '~workspace/lib/shared/ui';

export const CenterControl = ({ map }: { map: google.maps.Map }) => {
  const centerOnUser = useCallback(() => {
    if (!navigator.geolocation) {
      notifications.error({
        title: 'Error',
        message: `Your browser doesn't support geolocation.`,
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        map.panTo(pos);
      },
      () => {
        notifications.error({
          title: 'Error',
          message: 'The Geolocation service failed.',
        });
      },
      { maximumAge: 1000 }
    );
  }, [map]);

  useEffect(() => {
    centerOnUser();
  });

  return (
    <Button onClick={centerOnUser}>
      <IconLocation />
    </Button>
  );
};
