'use client';

import { useCallback } from 'react';

import { Text, Button, Textarea, Fieldset, Group } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';

import { notifications } from '~workspace/lib/shared/ui';
import {
  useApiRequestLazy,
  ErrorUtils,
  FetchInstance,
} from '~workspace/lib/shared/utils';

import { FormType, validator } from './validator';

export const PlaceReport = ({
  initialValues,
  onReported,
}: {
  initialValues: FormType;
  onReported: () => void;
}) => {
  const t = useTranslations();

  const { getInputProps, ...form } = useForm<FormType>({
    initialValues,
    validate: validator(t),
  });

  const { loading, execute } = useApiRequestLazy({
    operation: useCallback(
      async ({ reason, placeId }: FormType) =>
        FetchInstance.post(`/places/${placeId}/report`, {
          reason,
        }),
      []
    ),
    onSuccess: useCallback(() => {
      notifications.success({
        title: t(
          'place.component.placeReport.notification.placeReported.title'
        ),
        message: t(
          'place.component.placeReport.notification.placeReported.description'
        ),
      });
      onReported();
    }, [onReported, t]),
    onFailure: useCallback(
      (e: unknown) => {
        notifications.error({
          title: t(
            'place.component.placeReport.notification.placeReported.placeReportedFailure.title'
          ),
          message: t(
            'place.component.placeReport.notification.placeReported.placeReportedFailure.description',
            { error: t(ErrorUtils.getErrorMessage(e)) }
          ),
        });
      },
      [t]
    ),
  });

  return (
    <Form noValidate onSubmit={execute} form={{ getInputProps, ...form }}>
      <Text>{t('place.component.placeReport.modal.description')}</Text>
      <Fieldset>
        <Textarea
          label={t('shared.action.report', {
            entity: t('shared.entity.reason', { count: 1 }),
          })}
          {...getInputProps('reason')}
        />
      </Fieldset>
      <Group justify="space-between" mt="lg">
        <Button type="submit" loading={loading}>
          {t('shared.button.report')}
        </Button>
      </Group>
    </Form>
  );
};
