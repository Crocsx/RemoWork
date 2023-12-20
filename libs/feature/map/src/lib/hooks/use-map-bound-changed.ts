import { useCallback, useEffect } from 'react';

import { useDebounceCallback, useDebouncedState } from '@mantine/hooks';

export const useMapBoundsChanged = (
  map?: google.maps.Map,
  callback = (_?: google.maps.LatLngBounds) => null
) => {
  const [bounds, setBounds] = useDebouncedState<
    google.maps.LatLngBounds | undefined
  >(map?.getBounds(), 200);

  const onBoundsChanged = useCallback(() => {
    const bounds = map?.getBounds();
    callback(bounds);
    setBounds(bounds);
  }, [callback, map, setBounds]);
  const debounceCallback = useDebounceCallback(onBoundsChanged, 500);

  useEffect(() => {
    if (!map) return;

    const listener = google.maps.event.addListener(
      map,
      'bounds_changed',
      debounceCallback
    );

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map, debounceCallback]);

  return bounds;
};
