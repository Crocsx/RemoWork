import { useMemo } from 'react';

import { MantineTheme } from '@mantine/core';
import { Marker, MarkerProps } from '@react-google-maps/api';

export const UserLocation = ({
  theme,
  position,
}: {
  theme: MantineTheme;
  position: google.maps.LatLng;
}) => {
  const markerStyle = useMemo<Omit<MarkerProps, 'position'>>(
    () => ({
      icon: {
        fillColor: theme.colors[theme.primaryColor]?.[6],
        fillOpacity: 1,
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: theme.white,
        strokeWeight: 2,
      },
      clickable: false,
    }),
    [theme]
  );
  return <Marker {...markerStyle} position={position} />;
};
