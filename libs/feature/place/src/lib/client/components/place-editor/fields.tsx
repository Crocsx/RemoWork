import { Fieldset, TagsInput, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { SegmentedControl } from '~workspace/lib/shared/ui';

import { useFormContext } from './place-editor.validator';
import { PlaceDetailsPreview } from './preview/place-details-preview';
import {
  CertaintyLevel,
  PricingModel,
  SpeedLevel,
  NoiseLevel,
  QuantityLevel,
  ComfortLevel,
} from '../../../shared';

export const Fields = ({
  details,
}: {
  details: google.maps.places.PlaceResult;
}) => {
  const t = useTranslations();
  const { getInputProps, values, setFieldValue } = useFormContext();

  return (
    <Fieldset>
      <PlaceDetailsPreview details={details} />
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
        color="primary"
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
        color="primary"
        label={t('core.page.map.module.place.editor.field.wifiAvailability')}
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
        onChange={(values) => {
          if (values === CertaintyLevel.NO) {
            setFieldValue('wifiLogin', undefined);
            setFieldValue('wifiPassword', undefined);
          }
          if (getInputProps(`wifiAvailability`).onChange)
            getInputProps(`wifiAvailability`).onChange(values);
        }}
      />
      {values.wifiAvailability !== CertaintyLevel.NO && (
        <>
          <SegmentedControl
            mt="sm"
            color="primary"
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
            placeholder={t('shared.action.name', {
              entity: t('shared.entity.wifi', { count: 1 }),
            })}
            {...getInputProps('wifiLogin')}
          />
          <TextInput
            mt="sm"
            label={t('shared.entity.password', { count: 1 })}
            placeholder={t('shared.action.name', {
              entity: t('shared.entity.password', { count: 1 }),
            })}
            {...getInputProps('wifiPassword')}
          />
        </>
      )}
      <SegmentedControl
        mt="sm"
        color="primary"
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
        color="primary"
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
        color="primary"
        label={t('core.page.map.module.place.editor.field.meetingSpace')}
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
        {...getInputProps('meetingSpace')}
      />

      <SegmentedControl
        mt="sm"
        color="primary"
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
        color="primary"
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
    </Fieldset>
  );
};
