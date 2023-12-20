import { useMemo } from 'react';

import { MantineTheme } from '@mantine/core';
import { Circle, CircleProps } from '@react-google-maps/api';

export const UserAccuracy = ({
  theme,
  position,
  accuracy,
}: {
  theme: MantineTheme;
  position: google.maps.LatLng;
  accuracy: number;
}) => {
  const accuracyStyles = useMemo<Omit<CircleProps, 'position'>>(
    () => ({
      options: {
        fillColor: theme.colors[theme.primaryColor]?.[4],
        fillOpacity: 0.2,
        strokeColor: theme.colors[theme.primaryColor]?.[6],
        strokeOpacity: 0.2,
        clickable: false,
        strokeWeight: 1,
        zIndex: 1,
      },
    }),
    [theme]
  );

  return <Circle {...accuracyStyles} center={position} radius={accuracy} />;
};
