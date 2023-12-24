import { useCallback, useEffect } from 'react';

import { Group, Button, Flex, Text } from '@mantine/core';
import { Form } from '@mantine/form';
import { useAxiosCtx } from 'apps/remo-work/src/context';
import { useTranslations } from 'next-intl';

import {
  PricingModel,
  CertaintyLevel,
  SpeedLevel,
  NoiseLevel,
  QuantityLevel,
  ComfortLevel,
  Place,
} from '~workspace/lib/feature/place';
import { notifications } from '~workspace/lib/shared/ui';
import { ErrorUtils, useApiRequestLazy } from '~workspace/lib/shared/utils';

import { Fields } from './fields';
import { FormContext, FormType, useForm, validator } from './validator';

export const PlaceEditor = ({
  placeId,
  map,
  onCreated,
}: {
  placeId?: string;
  map: google.maps.Map;
  onCreated: () => void;
}) => {
  const t = useTranslations();
  const axios = useAxiosCtx();
  const { loading, execute } = useApiRequestLazy({
    operation: useCallback(
      async (values: FormType) => axios.put('/place', values),
      []
    ),
    onSuccess: useCallback(() => {
      notifications.success({
        title: t(
          'core.page.map.module.place.editor.notification.placeSaved.title'
        ),
        message: t(
          'core.page.map.module.place.editor.notification.placeSaved.description'
        ),
      });
      onCreated();
    }, []),
    onFailure: useCallback((e: unknown) => {
      notifications.error({
        title: t(
          'core.page.map.module.place.editor.notification.placeFailedToSaved.title'
        ),
        message: t(
          'core.page.map.module.place.editor.notification.placeFailedToSaved.description',
          { error: t(ErrorUtils.getErrorMessage(e)) }
        ),
      });
    }, []),
  });

  const { setFieldValue, ...form } = useForm({
    initialValues: {
      id: '',
      name: '',
      illustration: '',
      address: '',
      priceModel: PricingModel.PAID,
      wifiAvailability: CertaintyLevel.NO,
      wifiLogin: '',
      wifiPassword: '',
      wifiSpeed: SpeedLevel.AVERAGE,
      noiseLevel: NoiseLevel.MODERATE,
      talkingAllowed: CertaintyLevel.MAYBE,
      plugsQuantity: QuantityLevel.SOME,
      comfortLevel: ComfortLevel.ADEQUATE,
      tags: [],
    },
    validate: validator(t),
  });

  useEffect(() => {
    setFieldValue('id', placeId || '');
  }, [setFieldValue, placeId]);

  const submitHandler = useCallback(
    async ({ ...values }: FormType) => {
      await execute(values);
    },
    [execute]
  );

  return (
    <FormContext form={{ setFieldValue, ...form }}>
      <Form
        onSubmit={submitHandler}
        form={{ setFieldValue, ...form }}
        noValidate
      >
        <Text>{t('core.page.map.module.place.editor.description')}</Text>
        <Flex direction="column">
          <Fields bounds={map?.getBounds()} />
          <Group justify="space-between" mt="xl">
            <Button type="submit" loading={loading}>
              {t('shared.action.add', {
                entity: t('shared.entity.place', { count: 1 }),
              })}
            </Button>
          </Group>
        </Flex>
      </Form>
    </FormContext>
  );
};
