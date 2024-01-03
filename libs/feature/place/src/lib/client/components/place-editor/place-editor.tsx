'use client';
import { useCallback, useMemo } from 'react';

import { Group, Button, Flex } from '@mantine/core';
import { Form } from '@mantine/form';
import { useTranslations } from 'next-intl';

import { notifications } from '~workspace/lib/shared/ui';
import {
  ErrorUtils,
  useApiRequestLazy,
  useAxiosCtx,
} from '~workspace/lib/shared/utils';

import { Fields } from './fields';
import { FormContext, FormType, useForm, validator } from './validator';

export const PlaceEditor = ({
  initialValues,
  onCreated,
  onUpdated,
  details,
  mode = 'creation',
}: {
  initialValues?: FormType;
  onCreated?: () => void;
  onUpdated?: () => void;
  details: google.maps.places.PlaceResult;
  mode: 'creation' | 'edition';
}) => {
  const t = useTranslations();
  const axios = useAxiosCtx();
  const isCreation = useMemo(() => mode === 'creation', [mode]);
  const { loading, execute } = useApiRequestLazy({
    operation: useCallback(
      async (values: FormType) =>
        isCreation
          ? axios.put(`/places`, values)
          : axios.post(`/places/${values.id}`, values),
      [axios, isCreation]
    ),
    onSuccess: useCallback(() => {
      notifications.success({
        title: t(
          isCreation
            ? 'place.component.placeEditor.notification.placeSaved.title'
            : 'place.component.placeEditor.notification.placeUpdated.title'
        ),
        message: t(
          isCreation
            ? 'place.component.placeEditor.notification.placeSaved.description'
            : 'place.component.placeEditor.notification.placeUpdated.description'
        ),
      });
      isCreation ? onCreated?.() : onUpdated?.();
    }, [isCreation, onUpdated, onCreated, t]),
    onFailure: useCallback(
      (e: unknown) => {
        notifications.error({
          title: t(
            isCreation
              ? 'place.component.placeEditor.notification.placeFailedToSaved.title'
              : 'place.component.placeEditor.notification.placeFailedToUpdate.title'
          ),
          message: t(
            isCreation
              ? 'place.component.placeEditor.notification.placeFailedToSaved.description'
              : 'place.component.placeEditor.notification.placeFailedToUpdate.description',
            { error: t(ErrorUtils.getErrorMessage(e)) }
          ),
        });
      },
      [isCreation, t]
    ),
  });

  const form = useForm({
    initialValues,
    validate: validator(t),
  });

  const submitHandler = useCallback(
    async ({ ...values }: FormType) => {
      await execute(values);
    },
    [execute]
  );

  return (
    <FormContext form={form}>
      <Form onSubmit={submitHandler} form={form} noValidate>
        <Flex direction="column">
          <Fields details={details} />
          <Group justify="space-between" mt="xl">
            <Button type="submit" loading={loading}>
              {mode === 'creation'
                ? t('shared.action.add', {
                    entity: t('shared.entity.place', { count: 1 }),
                  })
                : t('shared.action.edit', {
                    entity: t('shared.entity.place', { count: 1 }),
                  })}
            </Button>
          </Group>
        </Flex>
      </Form>
    </FormContext>
  );
};
