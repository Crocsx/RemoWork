import { useCallback, useEffect, useState } from 'react';

import { Fieldset, TagsInput, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';

import {
  CertaintyLevel,
  ComfortLevel,
  NoiseLevel,
  PlaceSearchInput,
  PlaceUtils,
  PricingModel,
  QuantityLevel,
  SpeedLevel,
} from '~workspace/lib/feature/place';
import { SegmentedControl, notifications } from '~workspace/lib/shared/ui';

import { PlacePreview } from './preview/place-preview';
import { useFormContext } from './validator';

export const Fields = ({ bounds }: { bounds?: google.maps.LatLngBounds }) => {
  const t = useTranslations();
  const { getInputProps, values, setFieldValue, resetDirty, setValues } =
    useFormContext();

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

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
            'core.page.map.module.place.editor.notification.placeNotOperational.title'
          ),
          message: t(
            'core.page.map.module.place.editor.notification.placeNotOperational.description'
          ),
        });
        return;
      }
      setSelectedPlace(place);
      setValues({
        id: place.place_id || '',
        name: place.name || '',
        latitude: place.geometry?.location?.lat(),
        longitude: place.geometry?.location?.lng(),
        address: place.formatted_address,
        illustration: place.photos?.[0]?.getUrl(),
      });
    },
    [setValues, t]
  );

  useEffect(() => {
    if (values.wifiAvailability === CertaintyLevel.NO) {
      setFieldValue('wifiLogin', undefined);
      setFieldValue('wifiPassword', undefined);
    }
  }, [setFieldValue, values.wifiAvailability]);

  useEffect(() => {
    if (values.id) {
      resetDirty();
    }
  }, [resetDirty, values.id]);

  return (
    <Fieldset>
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
            bounds,
          },
        }}
        label={t('shared.action.search', {
          entity: t('shared.entity.place', { count: 1 }),
        })}
      />
      {selectedPlace && (
        <>
          <PlacePreview place={selectedPlace} />
          <TextInput
            mt="sm"
            label={t('shared.entity.name', { count: 1 })}
            {...getInputProps('name')}
            disabled={true}
          />
          <TextInput
            mt="sm"
            label={t('shared.entity.address', { count: 1 })}
            {...getInputProps('address')}
            disabled={true}
          />
          <SegmentedControl
            mt="sm"
            label={t('core.page.map.module.place.editor.field.priceModel')}
            data={[
              {
                label: t('shared.enum.priceModel', {
                  price: PricingModel.FREE,
                }),
                value: PricingModel.FREE,
              },
              {
                label: t('shared.enum.priceModel', {
                  price: PricingModel.PAID,
                }),
                value: PricingModel.PAID,
              },
            ]}
            {...getInputProps('priceModel')}
          />
          <SegmentedControl
            mt="sm"
            label={t(
              'core.page.map.module.place.editor.field.wifiAvailability'
            )}
            data={[
              {
                label: t('shared.enum.certaintyLevel', {
                  certainty: CertaintyLevel.NO,
                }),
                value: CertaintyLevel.NO,
              },
              {
                label: t('shared.enum.certaintyLevel', {
                  certainty: CertaintyLevel.YES,
                }),
                value: CertaintyLevel.YES,
              },
            ]}
            {...getInputProps('wifiAvailability')}
          />
          {values.wifiAvailability !== CertaintyLevel.NO && (
            <>
              <SegmentedControl
                mt="sm"
                label={t('core.page.map.module.place.editor.field.wifiSpeed')}
                data={[
                  {
                    label: t('shared.enum.speedLevel', {
                      speed: SpeedLevel.SLOW,
                    }),
                    value: SpeedLevel.SLOW,
                  },
                  {
                    label: t('shared.enum.speedLevel', {
                      speed: SpeedLevel.AVERAGE,
                    }),
                    value: SpeedLevel.AVERAGE,
                  },
                  {
                    label: t('shared.enum.speedLevel', {
                      speed: SpeedLevel.FAST,
                    }),
                    value: SpeedLevel.FAST,
                  },
                ]}
                {...getInputProps('wifiSpeed')}
              />
              <TextInput
                mt="sm"
                label={t('shared.entity.name', { count: 1 })}
                {...getInputProps('wifiLogin')}
              />
              <TextInput
                mt="sm"
                label={t('shared.entity.password', { count: 1 })}
                {...getInputProps('wifiPassword')}
              />
            </>
          )}
          <SegmentedControl
            mt="sm"
            label={t('core.page.map.module.place.editor.field.noiseLevel')}
            data={[
              {
                label: t('shared.enum.noiseLevel', { noise: NoiseLevel.QUIET }),
                value: NoiseLevel.QUIET,
              },
              {
                label: t('shared.enum.noiseLevel', {
                  noise: NoiseLevel.MODERATE,
                }),
                value: NoiseLevel.MODERATE,
              },
              {
                label: t('shared.enum.noiseLevel', { noise: NoiseLevel.NOISY }),
                value: NoiseLevel.NOISY,
              },
            ]}
            {...getInputProps('noiseLevel')}
          />

          <SegmentedControl
            mt="sm"
            label={t('core.page.map.module.place.editor.field.talkingAllowed')}
            data={[
              {
                label: t('shared.enum.certaintyLevel', {
                  certainty: CertaintyLevel.NO,
                }),
                value: CertaintyLevel.NO,
              },
              {
                label: t('shared.enum.certaintyLevel', {
                  certainty: CertaintyLevel.MAYBE,
                }),
                value: CertaintyLevel.MAYBE,
              },
              {
                label: t('shared.enum.certaintyLevel', {
                  certainty: CertaintyLevel.YES,
                }),
                value: CertaintyLevel.YES,
              },
            ]}
            {...getInputProps('talkingAllowed')}
          />

          <SegmentedControl
            mt="sm"
            label={t('core.page.map.module.place.editor.field.plugsQuantity')}
            data={[
              {
                label: t('shared.enum.quantityLevel', {
                  quantity: QuantityLevel.NONE,
                }),
                value: QuantityLevel.NONE,
              },
              {
                label: t('shared.enum.quantityLevel', {
                  quantity: QuantityLevel.SOME,
                }),
                value: QuantityLevel.SOME,
              },
              {
                label: t('shared.enum.quantityLevel', {
                  quantity: QuantityLevel.MANY,
                }),
                value: QuantityLevel.MANY,
              },
            ]}
            {...getInputProps('plugsQuantity')}
          />

          <SegmentedControl
            mt="sm"
            label={t('core.page.map.module.place.editor.field.comfortLevel')}
            data={[
              {
                label: t('shared.enum.comfortLevel', {
                  comfort: ComfortLevel.UNCOMFORTABLE,
                }),
                value: ComfortLevel.UNCOMFORTABLE,
              },
              {
                label: t('shared.enum.comfortLevel', {
                  comfort: ComfortLevel.ADEQUATE,
                }),
                value: ComfortLevel.ADEQUATE,
              },
              {
                label: t('shared.enum.comfortLevel', {
                  comfort: ComfortLevel.COMFORTABLE,
                }),
                value: ComfortLevel.COMFORTABLE,
              },
            ]}
            {...getInputProps('comfortLevel')}
          />
          <TagsInput
            mt="sm"
            label={t('core.page.map.module.place.editor.field.tags')}
            {...getInputProps('tags')}
          />
        </>
      )}
    </Fieldset>
  );
};
