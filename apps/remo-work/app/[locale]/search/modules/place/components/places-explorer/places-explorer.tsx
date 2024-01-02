'use client';

import { PlaceAddModal } from './place-add-modal';
import { PlaceFilters } from './place-filters';
import { PlaceList } from './place-list';
import { useMapCtx } from '../../../map';
import { usePlaceCtx } from '../../context';

export const PlacesExplorer = () => {
  const { map } = useMapCtx();
  const { setFilters, filters } = usePlaceCtx();

  return (
    <>
      <PlaceAddModal map={map} />
      <PlaceFilters filters={filters} filterChangeHandler={setFilters} />
      <PlaceList />
    </>
  );
};
