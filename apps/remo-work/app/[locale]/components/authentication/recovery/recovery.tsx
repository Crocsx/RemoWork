'use client';

import { useCallback } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';

import {
  Paper,
  Title,
  Text,
  Button,
  Container,
  Group,
  Center,
  rem,
  Alert,
  Anchor,
} from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { IconAlertTriangle, IconArrowLeft } from '@tabler/icons-react';
import { getAuth } from 'firebase/auth';
import { useTranslations } from 'next-intl';

import { Fields } from './fields';
import { FormContext, FormType, validator } from './validator';

export const Recovery = () => {
  const t = useTranslations();
  const [sendPasswordResetEmail, loading, error] = useSendPasswordResetEmail(
    getAuth()
  );
  const form = useForm<FormType>({
    initialValues: {
      email: '',
    },
    validate: validator(t),
  });

  const submitHandler = useCallback(
    ({ email }: FormType) => {
      sendPasswordResetEmail(email);
    },
    [sendPasswordResetEmail]
  );

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p="md" mt="md" radius="md" bg="secondary.2">
        <Group mb="md" justify="center">
          <Title order={2} ta="center">
            {t('core.page.recovery.title')}
          </Title>
          <Text size="sm" ta="center" mt={5}>
            {t('core.page.recovery.description')}
          </Text>
        </Group>
        <FormContext form={form}>
          <Form onSubmit={submitHandler} form={form} noValidate>
            <Fields />
            {error && (
              <Alert
                mt="xl"
                color="red"
                title={t('shared.action.error', {
                  entity: t('shared.button.signin'),
                })}
                icon={<IconAlertTriangle />}
              >
                {error.message}
              </Alert>
            )}
            <Group justify="space-between" mt="xl">
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Anchor ml={5} size="sm" href={'/signin'}>
                  {t('core.page.recovery.return')}
                </Anchor>
              </Center>
              <Button loading={loading} type="submit">
                {t('shared.action.reset', {
                  entity: t('shared.entity.password', { count: 1 }),
                })}
              </Button>
            </Group>
          </Form>
        </FormContext>
      </Paper>
    </Container>
  );
};
