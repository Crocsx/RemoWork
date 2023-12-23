import { useCallback } from 'react';

import { Card, Grid, LoadingOverlay, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { Place, PlaceDescription } from '~workspace/lib/feature/place';

import { useMapCtx } from '../../../map';
import { usePlaceCtx } from '../../context';

export const PlaceList = () => {
  const t = useTranslations();
  const { service, map } = useMapCtx();
  const { places, loading } = usePlaceCtx();

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
    <Grid w="100%" h="100%" pos="relative">
      <LoadingOverlay visible={loading} />
      {places.length === 0 && (
        <Grid.Col span={12}>
          <Text>{t('core.page.map.module.place.viewer.noPlaceFound')}</Text>
        </Grid.Col>
      )}
      {places?.map((p) => (
        <Grid.Col span={{ base: 12, md: 6, xl: 4 }} key={p.id}>
          <Card withBorder h="100%">
            <PlaceDescription
              place={p}
              service={service}
              goToHandler={goToPlace}
            />
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};
