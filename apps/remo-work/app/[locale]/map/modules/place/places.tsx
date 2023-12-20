'use client';

import { useEffect, useMemo } from 'react';

import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';

import { AuthRestricted } from '~workspace/lib/common/auth';
import { useMapBoundsChanged } from '~workspace/lib/feature/map';

import { PlaceEditor, PlaceList, PlaceFilters } from './components';
import { usePlaceCtx } from './context';
import { useMapCtx } from '../map';

export const Places = () => {
  const [opened, { open, close }] = useDisclosure();
  const t = useTranslations();
  const { map } = useMapCtx();
  const { setFilters, filters } = usePlaceCtx();
  const bounds = useMapBoundsChanged(map);

  // Redraw modal after animation to fix incorrect height inside
  // https://github.com/mantinedev/mantine/issues/3330#issuecomment-1384908673
  const key = useMemo(() => `${Math.random().toString()}-${opened}`, [opened]);

  useEffect(() => {
    const ne = bounds?.getNorthEast();
    const sw = bounds?.getSouthWest();

    if (ne && sw)
      setFilters({
        ...filters,
        north: ne.lat(),
        south: sw.lat(),
        east: ne.lng(),
        west: sw.lng(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds, setFilters]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        title={t('core.page.map.module.place.editor.title')}
      >
        {map && <PlaceEditor key={key} onCreated={close} map={map} />}
      </Modal>
      <Group>
        <AuthRestricted>
          {(isAuthenticated) => (
            <Button fullWidth onClick={open} disabled={!isAuthenticated}>
              {t('shared.action.add', {
                entity: t('shared.entity.place', { count: 1 }),
              })}
            </Button>
          )}
        </AuthRestricted>
        <PlaceFilters filters={filters} filterChangeHandler={setFilters} />
      </Group>
      <Group py="md" style={{ overflow: 'auto' }} mih="100%" align="start">
        <PlaceList />
      </Group>
    </>
  );
};
