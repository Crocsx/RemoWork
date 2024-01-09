import { useEffect, useState } from 'react';

import { Carousel } from '@mantine/carousel';
import {
  Anchor,
  Badge,
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
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { AuthRestricted } from '~workspace/lib/common/auth';
import {
  CertaintyLevel,
  Place,
  PlaceOpeningTime,
  PlaceUtils,
} from '~workspace/lib/feature/place';
import { Image } from '~workspace/lib/shared/ui';
import {
  EMPTY_DEFAULT,
  FetchInstance,
  useApiRequest,
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
  const [details, setDetails] =
    useState<google.maps.places.PlaceResult | null>();
  const { loading, response: place } = useApiRequest<Place>({
    operation: () => FetchInstance.get<Place>(`/places/${placeId}`),
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
    <Flex direction="column" flex="1" gap="sm">
      <Flex justify="space-between">
        <Button variant="outline" onClick={back}>
          <IconArrowLeft />
          {t('shared.button.back')}
        </Button>
        <AuthRestricted>
          <PlaceEditModal place={place} details={details} />
        </AuthRestricted>
      </Flex>
      <ScrollArea scrollbars="y" offsetScrollbars="y" style={{ flex: 1 }}>
        <Flex direction="column" gap="sm">
          <LoadingOverlay visible={loading} bg="secondary.0" />
          <Group pos="relative">
            <Rating
              top={0}
              right={0}
              p="md"
              readOnly={true}
              value={PlaceUtils.ratePlace(place)}
              size="lg"
              pos="absolute"
              style={{ zIndex: 1 }}
            />
            <Carousel
              loop
              withIndicators
              height={rem(240)}
              dragFree
              slideGap="md"
              align="start"
              w="100%"
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
              title={t('shared.entity.name', { count: 1 })}
              value={place?.name}
            />
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
              value={
                place?.wifiAvailability
                  ? t('shared.enum.certaintyLevel', {
                      certainty: place?.wifiAvailability,
                    })
                  : EMPTY_DEFAULT
              }
            />
            {!!place?.wifiAvailability &&
              place?.wifiAvailability !== CertaintyLevel.NO && (
                <>
                  <PlaceDetailField
                    title={t(
                      'core.page.map.module.place.viewer.field.wifiSpeed'
                    )}
                    value={
                      place?.wifiSpeed
                        ? t('shared.enum.speedLevel', {
                            speed: place?.wifiSpeed,
                          })
                        : EMPTY_DEFAULT
                    }
                  />
                  <PlaceDetailField
                    title={t(
                      'core.page.map.module.place.viewer.field.wifiName'
                    )}
                    value={place?.wifiLogin || EMPTY_DEFAULT}
                  />
                  <PlaceDetailField
                    title={t(
                      'core.page.map.module.place.viewer.field.wifiPassword'
                    )}
                    value={place?.wifiPassword || EMPTY_DEFAULT}
                  />
                </>
              )}
            <PlaceDetailField
              title={t('core.page.map.module.place.viewer.field.noiseLevel')}
              value={
                place?.noiseLevel
                  ? t('shared.enum.noiseLevel', {
                      noise: place?.noiseLevel,
                    })
                  : EMPTY_DEFAULT
              }
            />
            <PlaceDetailField
              title={t('core.page.map.module.place.viewer.field.meetingSpace')}
              value={
                place?.meetingSpace
                  ? t('shared.enum.certaintyLevel', {
                      certainty: place?.meetingSpace,
                    })
                  : EMPTY_DEFAULT
              }
            />
            <PlaceDetailField
              title={t(
                'core.page.map.module.place.viewer.field.talkingAllowed'
              )}
              value={
                place?.talkingAllowed
                  ? t('shared.enum.certaintyLevel', {
                      certainty: place?.talkingAllowed,
                    })
                  : EMPTY_DEFAULT
              }
            />
            <PlaceDetailField
              title={t('core.page.map.module.place.viewer.field.plugsQuantity')}
              value={
                place?.plugsQuantity
                  ? t('shared.enum.quantityLevel', {
                      quantity: place?.plugsQuantity,
                    })
                  : EMPTY_DEFAULT
              }
            />
            <PlaceDetailField
              title={t('core.page.map.module.place.viewer.field.comfortLevel')}
              value={
                place?.comfortLevel
                  ? t('shared.enum.comfortLevel', {
                      comfort: place?.comfortLevel,
                    })
                  : EMPTY_DEFAULT
              }
            />
            <PlaceDetailField
              title={t('core.page.map.module.place.viewer.field.tags')}
              value={
                place?.tags?.map((tag) => <Badge key={tag}>{tag}</Badge>) ||
                EMPTY_DEFAULT
              }
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
