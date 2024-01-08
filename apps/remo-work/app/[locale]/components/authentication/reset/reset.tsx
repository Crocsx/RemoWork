'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  Alert,
  Text,
  Container,
  Paper,
  Title,
  Button,
  Group,
  Flex,
  LoadingOverlay,
} from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { IconAlertTriangle } from '@tabler/icons-react';
import {
  confirmPasswordReset,
  getAuth,
  verifyPasswordResetCode,
} from 'firebase/auth';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ErrorUtils } from '~workspace/lib/shared/utils';

import { Fields } from './fields';
import { FormContext, FormType, validator } from './validator';

export const Reset = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();

  const [passwordChanged, setPasswordChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVeryifing] = useState(true);
  const [error, setError] = useState<unknown>();
  const form = useForm<FormType>({
    initialValues: {
      email: '',
      password: '',
      oobCode: '',
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

  useEffect(() => {
    async function verifyToken() {
      try {
        const code = searchParams.get('oobCode');
        console.log(code);
        if (code) {
          const email = await verifyPasswordResetCode(getAuth(), code);
          form.setFieldValue('email', email);
          form.setFieldValue('oobCode', code);
          console.log(email);
        }
        throw new Error('Missing oobCode');
      } catch (e) {
        setError(e);
      } finally {
        setVeryifing(false);
      }
    }

    setVeryifing(true);
    verifyToken();
  }, []);

  return (
    <Container size={420} my={40}>
      <LoadingOverlay visible={verifying} bg="secondary.0" />
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
