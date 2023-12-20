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
    <Grid w="100%" gutter={0} pos="relative">
      <Grid.Col span={{ base: 12, md: 6, xl: 4 }}>
        <LoadingOverlay visible={loading} />
        {places.length === 0 && (
          <Text>{t('core.page.map.module.place.viewer.noPlaceFound')}</Text>
        )}
        {places?.map((p) => (
          <Card withBorder key={p.id}>
            <PlaceDescription
              place={p}
              service={service}
              goToHandler={goToPlace}
            />
          </Card>
        ))}
      </Grid.Col>
    </Grid>
  );
};
