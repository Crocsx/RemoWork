import { useCallback } from 'react';

import {
  Card,
  Flex,
  Grid,
  LoadingOverlay,
  ScrollArea,
  Text,
} from '@mantine/core';
import { IconSearchOff } from '@tabler/icons-react';
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
    <>
      <LoadingOverlay visible={loading} bg="secondary.0" />
      {places.length === 0 ? (
        <Flex
          direction="column"
          w="100%"
          h="100%"
          align="center"
          justify="center"
        >
          <IconSearchOff size={48}></IconSearchOff>
          <Text>
            {t('shared.action.notFound', {
              entity: t('shared.entity.place', { count: 2 }),
            })}
          </Text>
          <Text>{t('core.page.map.module.place.viewer.refineYourSearch')}</Text>
        </Flex>
      ) : (
        <ScrollArea h="100%" type="auto" scrollbars="y">
          <Grid>
            {places?.map((p) => (
              <Grid.Col span={{ base: 12, md: 6, xl: 4 }} key={p.id}>
                <Card withBorder h="100%" bg="secondary.2">
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
      )}
    </>
  );
};
