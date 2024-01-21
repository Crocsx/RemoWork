'use client';
import { useCallback, useEffect, useMemo } from 'react';

import { Button, Flex } from '@mantine/core';
import { Form } from '@mantine/form';
import { useTranslations } from 'next-intl';

import { useCreatePlace, useUpdatePlace } from './fetcher';
import { Fields } from './fields';
import {
  FormContextProvider,
  FormType,
  useForm,
  validator,
} from './place-editor.validator';

export const PlaceEditor = ({
  onCreated,
  onUpdated,
  details,
  mode = 'creation',
  initialValues = {
    id: '',
    latitude: 0,
    longitude: 0,
    name: '',
  },
}: {
  onCreated?: () => void;
  onUpdated?: () => void;
  details: google.maps.places.PlaceResult;
  mode: 'creation' | 'edition';
  initialValues?: FormType;
}) => {
  const t = useTranslations();
  const isCreation = useMemo(() => mode === 'creation', [mode]);
  const { loading: creating, createPlace } = useCreatePlace();
  const { loading: updating, updatePlace } = useUpdatePlace();

  const form = useForm({
    initialValues,
    validate: validator(t),
  });

  useEffect(() => {
    if (initialValues.id !== form.values.id) {
      form.setInitialValues(initialValues);
      form.reset();
    }
  }, [form, initialValues, initialValues.id]);

  const submitHandler = useCallback(
    async ({ ...values }: FormType) => {
      if (isCreation) {
        await createPlace(values);
        onCreated?.();
      } else {
        await updatePlace(values);
        onUpdated?.();
      }
    },
    [createPlace, isCreation, onCreated, onUpdated, updatePlace]
  );

  return (
    <FormContextProvider form={form}>
      <Form onSubmit={submitHandler} form={form} noValidate>
        <Flex direction="column">
          <Fields details={details} />
          <Button
            type="submit"
            loading={creating || updating}
            justify="end"
            ml="auto"
          >
            {mode === 'creation'
              ? t('shared.action.add', {
                  entity: t('shared.entity.place', { count: 1 }),
                })
              : t('shared.action.edit', {
                  entity: t('shared.entity.place', { count: 1 }),
                })}
          </Button>
        </Flex>
      </Form>
    </FormContextProvider>
  );
};
