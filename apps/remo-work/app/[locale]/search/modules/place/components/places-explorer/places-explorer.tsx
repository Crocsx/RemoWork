'use client';

import { useEffect } from 'react';

import { useMapBoundsChanged } from '~workspace/lib/feature/map';

import { PlaceAddModal } from './place-add-modal';
import { PlaceFilters } from './place-filters';
import { PlaceList } from './place-list';
import { useMapCtx } from '../../../map';
import { usePlaceCtx } from '../../context';

export const PlacesExplorer = () => {
  const { map } = useMapCtx();
  const { setFilters, filters } = usePlaceCtx();
  const bounds = useMapBoundsChanged(map);

  useEffect(() => {
    const ne = bounds?.getNorthEast();
    const sw = bounds?.getSouthWest();

    if (ne && sw)
      setFilters({
        ...filters,
        zoom: map?.getZoom(),
        north: ne.lat(),
        south: sw.lat(),
        east: ne.lng(),
        west: sw.lng(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds, setFilters]);

  return (
    <>
      <PlaceAddModal map={map} />
      <PlaceFilters filters={filters} filterChangeHandler={setFilters} />
      <PlaceList />
    </>
  );
};
