import {
  usePlaceCtx,
  useMapCtx,
} from '~workspace/app/remo-work/app/explore/_context';

import { PlaceAddModal } from './place-add-modal';
import { PlaceFilters } from './place-filters';
import { PlaceList } from './place-list';

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
