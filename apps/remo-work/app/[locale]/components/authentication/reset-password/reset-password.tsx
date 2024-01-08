'use client';

import { useCallback, useState } from 'react';

import {
  Alert,
  Text,
  Container,
  Paper,
  Title,
  Button,
  Group,
  Flex,
} from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { IconAlertTriangle } from '@tabler/icons-react';
import { ActionCodeInfo, confirmPasswordReset, getAuth } from 'firebase/auth';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { ErrorUtils } from '~workspace/lib/shared/utils';

import { Fields } from './fields';
import { FormContext, FormType, validator } from './validator';

export const ResetPassword = ({
  oobCode,
}: {
  codeInfo: ActionCodeInfo;
  oobCode: string;
}) => {
  const t = useTranslations();

  const [passwordChanged, setPasswordChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const form = useForm<FormType>({
    initialValues: {
      password: '',
      oobCode,
    },
    validate: validator(t),
  });

  const submitHandler = useCallback(
    async ({ oobCode, password }: FormType) => {
      setLoading(true);
      try {
        await confirmPasswordReset(getAuth(), oobCode, password);
        setPasswordChange(true);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  return (
    <Container size={420} my={40}>
      {!passwordChanged ? (
        <Paper
          withBorder
          shadow="md"
          p="md"
          mt="md"
          radius="md"
          bg="secondary.2"
        >
          <Group mb="md" justify="center">
            <Title order={2} ta="center">
              {t('core.page.reset.title')}
            </Title>
            <Text size="sm" ta="center" mt={5}>
              {t.rich('core.page.reset.description')}
            </Text>
          </Group>
          <FormContext form={form}>
            <Form onSubmit={submitHandler} form={form} noValidate>
              <Fields />
              {!!error && (
                <Alert
                  mt="xl"
                  color="red"
                  title={t('shared.action.error', {
                    entity: t('shared.button.signin'),
                  })}
                  icon={<IconAlertTriangle />}
                >
                  {ErrorUtils.getErrorMessage(error)}
                </Alert>
              )}
              <Button loading={loading} fullWidth mt="xl" type="submit">
                {t('shared.action.change', {
                  entity: t('shared.entity.password', { count: 1 }),
                })}
              </Button>
            </Form>
          </FormContext>
        </Paper>
      ) : (
        <Paper
          withBorder
          shadow="md"
          p="md"
          mt="md"
          radius="md"
          bg="secondary.2"
        >
          <Flex direction="column" align="center" gap="md">
            <Group mb="md" justify="center">
              <Title order={2} ta="center">
                {t('core.page.reset.notification.confirmed.title')}
              </Title>
              <Text>
                {t('core.page.reset.notification.confirmed.description')}
              </Text>
            </Group>
            <Button component={Link} href="/signin">
              {t('shared.action.goTo', {
                entity: t('shared.button.signin'),
              })}
            </Button>
          </Flex>
        </Paper>
      )}
    </Container>
  );
};
