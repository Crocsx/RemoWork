import { useState, useEffect } from 'react';

import { Carousel } from '@mantine/carousel';
import {
  Button,
  Flex,
  Text,
  LoadingOverlay,
  rem,
  Anchor,
  Grid,
  Rating,
  Group,
  ScrollArea,
} from '@mantine/core';
import {
  IconAlertTriangle,
  IconAlertTriangleFilled,
  IconArrowLeft,
  IconBrandSpeedtest,
  IconKey,
  IconPencil,
  IconRouter,
  IconTrashFilled,
  IconWifi,
} from '@tabler/icons-react';
import { useAxiosCtx } from 'apps/remo-work/src/context';
import { PlaceIcons } from 'libs/feature/place/src/lib/client/components/place-card/place-icons';
import { PlaceOpeningTime } from 'libs/feature/place/src/lib/client/components/place-card/place-opening-time';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import {
  CertaintyLevel,
  Place,
  PlaceUtils,
  certaintyLevelColor,
  speedLevelColor,
} from '~workspace/lib/feature/place';
import { EMPTY_DEFAULT, useApiRequest } from '~workspace/lib/shared/utils';
import { AuthRestricted } from '~workspace/lib/common/auth';
import { PlaceDetailField } from './place-details-field';

export const PlaceDetails = ({
  service,
  placeId,
}: {
  service?: google.maps.places.PlacesService;
  placeId: string;
}) => {
  const { back } = useRouter();
  const t = useTranslations();
  const axios = useAxiosCtx();
  const [details, setDetails] =
    useState<google.maps.places.PlaceResult | null>();

  useEffect(() => {
    const cache = PlaceUtils.cache[placeId];
    if (cache) {
      setDetails(cache);
    } else {
      service?.getDetails(
        {
          placeId: placeId,
          fields: ['opening_hours', 'place_id', 'geometry', 'photos'],
        },
        (detail) => {
          PlaceUtils.addPlace(placeId, detail);
          setDetails(detail);
        }
      );
    }
  }, [service, placeId]);

  const { loading, response } = useApiRequest<Place>({
    operation: () => axios.get(`/places/${placeId}`),
  });

  const place = response?.data;

  return (
    <Flex direction="column" style={{ flex: 1 }} gap="sm">
      <Flex justify="space-between">
        <Button variant="outline">
          <IconArrowLeft />
          {t('shared.button.back')}
        </Button>
        <AuthRestricted>
          <Button leftSection={<IconPencil />}>
            {t('shared.action.edit', {
              entity: t('shared.entity.place', { count: 1 }),
            })}
          </Button>
        </AuthRestricted>
      </Flex>
      <ScrollArea scrollbars="y" style={{ flex: 1 }}>
        <Flex direction="column" gap="sm">
          <LoadingOverlay visible={loading} />
          <Group pos="relative">
            <Rating
              bottom={0}
              right={0}
              p="md"
              readOnly={true}
              value={PlaceUtils.ratePlace(place)}
              size="lg"
              pos="absolute"
            />
            <Carousel
              loop
              withIndicators
              height={rem(240)}
              dragFree
              w="100%"
              slideGap="md"
              align="start"
            >
              {[
                ...(details?.photos?.slice(0, 3).map((photo) =>
                  photo.getUrl({
                    maxHeight: 640,
                    maxWidth: 360,
                  })
                ) || ['https://placehold.co/640x360']),
              ].map((image, i) => (
                <Carousel.Slide key={i}>
                  <Image
                    fill
                    src={image}
                    alt="place illustration"
                    sizes="350px"
                  ></Image>
                </Carousel.Slide>
              ))}
            </Carousel>
          </Group>
          <Grid>
            <PlaceDetailField
              title={t('core.page.map.module.place.viewer.field.openingTime')}
              value={<PlaceOpeningTime openingHours={details?.opening_hours} />}
            />
            <PlaceDetailField
              title={t('core.page.map.module.place.viewer.field.address')}
              value={
                <Anchor
                  href={`https://maps.googleapis.com/maps/api/directions/json?origin=${place?.latitude},${place?.longitude}&destination=place_id:${place?.id}`}
                  target="_blank"
                >
                  {place?.address}
                </Anchor>
              }
            />
            <PlaceDetailField
              title={t(
                'core.page.map.module.place.viewer.field.wifiAvailability'
              )}
              value={t('shared.enum.certaintyLevel', {
                certainty: place?.wifiAvailability,
              })}
            />
            {place?.wifiAvailability !== CertaintyLevel.NO}
            {
              <>
                <PlaceDetailField
                  title={t('core.page.map.module.place.viewer.field.wifiSpeed')}
                  value={t('shared.enum.speedLevel', {
                    speed: place?.wifiSpeed,
                  })}
                />
                <PlaceDetailField
                  title={t('core.page.map.module.place.viewer.field.wifiName')}
                  value={place?.wifiLogin || EMPTY_DEFAULT}
                />
                <PlaceDetailField
                  title={t(
                    'core.page.map.module.place.viewer.field.wifiPassword'
                  )}
                  value={place?.wifiPassword || EMPTY_DEFAULT}
                />
              </>
            }
            <PlaceDetailField
              title={t('core.page.map.module.place.viewer.field.noiseLevel')}
              value={t('shared.enum.noiseLevel', {
                noise: place?.noiseLevel,
              })}
            />
            <PlaceDetailField
              title={t('core.page.map.module.place.viewer.field.MeetingRoom')}
              value={t('shared.enum.certaintyLevel', {
                certaintyLevel: place?.hasMeetingRoom,
              })}
            />
            <PlaceDetailField
              title={t(
                'core.page.map.module.place.viewer.field.talkingAllowed'
              )}
              value={t('shared.enum.certaintyLevel', {
                certainty: place?.talkingAllowed,
              })}
            />
            <PlaceDetailField
              title={t('core.page.map.module.place.viewer.field.plugsQuantity')}
              value={t('shared.enum.quantityLevel', {
                quantity: place?.plugsQuantity,
              })}
            />
            <PlaceDetailField
              title={t('core.page.map.module.place.viewer.field.comfortLevel')}
              value={t('shared.enum.comfortLevel', {
                comfort: place?.comfortLevel,
              })}
            />
          </Grid>
        </Flex>
      </ScrollArea>
      <AuthRestricted>
        <Flex justify="space-between">
          <Button color="red" leftSection={<IconTrashFilled />}>
            {t('shared.action.delete', {
              entity: t('shared.entity.place', { count: 1 }),
            })}
          </Button>
          <Button
            variant="subtle"
            color="red"
            leftSection={<IconAlertTriangleFilled />}
          >
            {t('shared.action.report', {
              entity: t('shared.entity.place', { count: 1 }),
            })}
          </Button>
        </Flex>
      </AuthRestricted>
    </Flex>
  );
};
