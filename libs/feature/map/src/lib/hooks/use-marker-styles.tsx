import { useMemo } from 'react';

import { useMantineTheme } from '@mantine/core';
import { MarkerProps } from '@react-google-maps/api';

export const useMarkerStyles = ({
  options,
}: {
  options?: Omit<MarkerProps, 'position'>;
}) => {
  const theme = useMantineTheme();
  const markerStyle = useMemo<Omit<MarkerProps, 'position'>>(
    () => ({
      icon: {
        url: 'data:image/svg+xml;utf-8, <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" stroke-width="0" fill="currentColor" /></svg>',
        fillColor: theme.colors[theme.primaryColor]?.[6],
        fillOpacity: 1,
      },
      ...options,
    }),
    [options, theme.colors, theme.primaryColor]
  );
  return markerStyle;
};
