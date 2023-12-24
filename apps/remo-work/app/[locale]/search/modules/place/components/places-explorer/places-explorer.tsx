'use client';

import { useEffect } from 'react';

import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { AuthRestricted } from '~workspace/lib/common/auth';
import { useMapBoundsChanged } from '~workspace/lib/feature/map';

import { PlaceFilters } from './place-filters';
import { PlaceList } from './place-list';
import { useMapCtx } from '../../../map';
import { usePlaceCtx } from '../../context';

export const PlacesExplorer = ({
  addPlaceHandler,
}: {
  addPlaceHandler?: () => void;
}) => {
  const t = useTranslations();
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
      <AuthRestricted>
        {(isAuthenticated) => (
          <Button
            fullWidth
            onClick={addPlaceHandler}
            disabled={!isAuthenticated}
          >
            {t('shared.action.add', {
              entity: t('shared.entity.place', { count: 1 }),
            })}
          </Button>
        )}
      </AuthRestricted>
      <PlaceFilters filters={filters} filterChangeHandler={setFilters} />
      <PlaceList />
    </>
  );
};
