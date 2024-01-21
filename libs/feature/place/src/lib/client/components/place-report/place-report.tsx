'use client';

import { useCallback } from 'react';

import { Text, Button, Textarea, Fieldset, Group } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';

import { usePlaceReport } from './fetcher';
import { FormType, validator } from './validator';

export const PlaceReport = ({
  initialValues,
  placeId,
  onReported,
}: {
  initialValues: FormType;
  placeId: string;
  onReported: () => void;
}) => {
  const t = useTranslations();

  const { getInputProps, ...form } = useForm<FormType>({
    initialValues,
    validate: validator(t),
  });

  const { reporting, reportPlace } = usePlaceReport({ placeId });

  const reportHandler = useCallback(
    async (formData: FormType) => {
      await reportPlace(formData);
      onReported();
    },
    [onReported, reportPlace]
  );

  return (
    <Form noValidate onSubmit={reportHandler} form={{ getInputProps, ...form }}>
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
        <Button type="submit" loading={reporting}>
          {t('shared.button.report')}
        </Button>
      </Group>
    </Form>
  );
};
