import { useCallback } from 'react';

import { Card, Grid, LoadingOverlay, ScrollArea, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { Place, PlaceCard } from '~workspace/lib/feature/place';

import { useMapCtx } from '../../../../map';
import { usePlaceCtx } from '../../../context';

export const PlaceList = () => {
  const t = useTranslations();
  const { service, map } = useMapCtx();
  const { places, loading, setSelectedPlaceId } = usePlaceCtx();

  const goToPlace = useCallback(
    (place: Place) => {
      map?.panTo({
        lat: place.latitude,
        lng: place.longitude,
      });
    },
    [map]
  );

  return (
    <ScrollArea h="100%" type="auto" offsetScrollbars scrollbars="y">
      <LoadingOverlay visible={loading} />
      {places.length === 0 && (
        <Text>{t('core.page.map.module.place.viewer.noPlaceFound')}</Text>
      )}
      <Grid>
        {places?.map((p) => (
          <Grid.Col span={{ base: 12, md: 6, xl: 4 }} key={p.id}>
            <Card withBorder h="100%">
              <PlaceCard
                place={p}
                service={service}
                goToHandler={goToPlace}
                onSelect={() => {
                  map?.panTo({
                    lat: p.latitude,
                    lng: p.longitude,
                  });
                  setSelectedPlaceId(p.id);
                }}
              />
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </ScrollArea>
  );
};
