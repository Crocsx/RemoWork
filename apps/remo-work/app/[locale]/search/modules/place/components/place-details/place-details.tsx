import { useEffect, useState } from 'react';

import { Carousel } from '@mantine/carousel';
import {
  Anchor,
  Button,
  Flex,
  Grid,
  Group,
  LoadingOverlay,
  Rating,
  ScrollArea,
  rem,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { AuthRestricted } from '~workspace/lib/common/auth';
import {
  CertaintyLevel,
  Place,
  PlaceOpeningTime,
  PlaceUtils,
} from '~workspace/lib/feature/place';
import {
  EMPTY_DEFAULT,
  useApiRequest,
  useAxiosCtx,
} from '~workspace/lib/shared/utils';

import { PlaceDetailField } from './place-details-field';
import { PlaceEditModal } from './place-edit-modal';
import { PlaceReportModal } from './place-report-modal';

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
  const { loading, response: { data: place } = {} } = useApiRequest<Place>({
    operation: () => axios.get(`/places/${placeId}`),
  });

  useEffect(() => {
    const retrievePlace = async () => {
      if (!service) return;
      setDetails(
        await PlaceUtils.retrieveFromCache(
          placeId,
          ['opening_hours', 'place_id', 'geometry', 'photos'],
          service
        )
      );
    };
    retrievePlace();
  }, [service, placeId]);

  return (
    <Flex direction="column" style={{ flex: 1 }} gap="sm">
      <Flex justify="space-between">
        <Button variant="outline" onClick={back}>
          <IconArrowLeft />
          {t('shared.button.back')}
        </Button>
        <AuthRestricted>
          <PlaceEditModal place={place} details={details} />
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
              title={t('core.page.map.module.place.viewer.field.meetingSpace')}
              value={t('shared.enum.certaintyLevel', {
                certainty: place?.meetingSpace,
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
          <PlaceReportModal placeId={place?.id} />
        </Flex>
      </AuthRestricted>
    </Flex>
  );
};
