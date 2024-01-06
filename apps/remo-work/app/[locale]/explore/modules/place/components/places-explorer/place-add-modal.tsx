'use client';

import { useCallback, useState } from 'react';

import { Button, Modal, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';

import { AuthRestricted } from '~workspace/lib/common/auth';
import {
  Place,
  PlaceEditor,
  PlaceSearchInput,
  PlaceUtils,
} from '~workspace/lib/feature/place';
import { notifications } from '~workspace/lib/shared/ui';

export const PlaceAddModal = ({
  place,
  map,
  details = null,
}: {
  place?: Place;
  details?: google.maps.places.PlaceResult | null;
  map?: google.maps.Map;
}) => {
  const [opened, { open, close }] = useDisclosure();
  const t = useTranslations();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(details);

  const placeSelectHandler = useCallback(
    (place: google.maps.places.PlaceResult) => {
      if (!place.place_id) return;

      PlaceUtils.addPlace(place.place_id, place);

      if (
        place.business_status &&
        place.business_status !== google.maps.places.BusinessStatus.OPERATIONAL
      ) {
        notifications.error({
          title: t(
            'place.component.placeEditor.notification.placeNotOperational.title'
          ),
          message: t(
            'place.component.placeEditor.notification.placeNotOperational.description'
          ),
        });
        return;
      }
      setSelectedPlace(place);
    },
    [t]
  );

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        title={t('core.page.map.module.place.editor.title')}
      >
        <Text>{t('core.page.map.module.place.editor.description')}</Text>
        {!place && (
          <PlaceSearchInput
            widgetOptions={{
              apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
              onPlaceSelected: placeSelectHandler,
              options: {
                types: ['establishment'],
                fields: [
                  'formatted_address',
                  'business_status',
                  'name',
                  'opening_hours',
                  'place_id',
                  'geometry',
                  'photos',
                ],
                bounds: map?.getBounds(),
              },
            }}
            label={t('shared.action.search', {
              entity: t('shared.entity.place', { count: 1 }),
            })}
          />
        )}
        {selectedPlace && (
          <PlaceEditor
            mode="creation"
            onCreated={close}
            details={selectedPlace}
            initialValues={{
              id: selectedPlace.place_id,
              name: selectedPlace.name,
              latitude: selectedPlace.geometry?.location?.lat(),
              longitude: selectedPlace.geometry?.location?.lng(),
              address: selectedPlace.formatted_address,
              illustration: selectedPlace.photos?.[0]?.getUrl(),
              ...place,
            }}
          />
        )}
      </Modal>
      <AuthRestricted>
        {({ verified }) => (
          <Tooltip
            label={t('core.generic.restrictedToVerifiedUser')}
            disabled={verified}
          >
            <Button type="button" fullWidth onClick={open} disabled={!verified}>
              {t('shared.action.add', {
                entity: t('shared.entity.place', { count: 1 }),
              })}
            </Button>
          </Tooltip>
        )}
      </AuthRestricted>
    </>
  );
};
