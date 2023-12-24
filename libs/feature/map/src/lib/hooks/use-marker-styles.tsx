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
        ...(typeof options?.icon === 'object' && options?.icon),
        path: 'M 0 19 L 12 -8 L 5 -16 L -5 -16 L -12 -8 Z',
      },
    }),
    [options, theme.colors, theme.primaryColor]
  );
  return markerStyle;
};
