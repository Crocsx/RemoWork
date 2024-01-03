import { useMemo } from 'react';

import { useMantineTheme } from '@mantine/core';
import { MarkerProps } from '@react-google-maps/api';

export const useMarkerStyles = ({
  options,
}: {
  options?: Omit<MarkerProps, 'position' | 'icon'> & {
    icon: Partial<string | google.maps.Icon | google.maps.Symbol | undefined>;
  };
}) => {
  const theme = useMantineTheme();
  const markerStyle = useMemo<Omit<MarkerProps, 'position'>>(
    () => ({
      ...options,
      icon: {
        fillColor: theme.colors[theme.primaryColor]?.[6],
        strokeColor: theme.colors[theme.primaryColor]?.[6],
        fillOpacity: 1,
        anchor: new google.maps.Point(12, 24),
        scale: 1.4,
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
        ...(typeof options?.icon === 'object' && options?.icon),
      },
    }),
    [options, theme.colors, theme.primaryColor]
  );
  return markerStyle;
};
