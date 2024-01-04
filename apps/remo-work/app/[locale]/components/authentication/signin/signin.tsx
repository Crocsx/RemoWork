'use client';

import { useCallback } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import {
  Alert,
  Text,
  Container,
  Paper,
  Title,
  Button,
  Anchor,
  Group,
} from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { IconAlertTriangle } from '@tabler/icons-react';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
} from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { notifications } from '~workspace/lib/shared/ui';
import { ErrorUtils } from '~workspace/lib/shared/utils';

import { Fields } from './fields';
import { FormContext, FormType, validator } from './validator';

export const SignIn = () => {
  const t = useTranslations();
  const router = useRouter();

  const [signInWithEmailAndPassword, _, loading, error] =
    useSignInWithEmailAndPassword(getAuth());
  const form = useForm<FormType>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: validator(t),
  });

  const submitHandler = useCallback(
    async ({ email, password, rememberMe }: FormType) => {
      try {
        getAuth().setPersistence(
          rememberMe ? browserLocalPersistence : browserSessionPersistence
        );
        const response = await signInWithEmailAndPassword(email, password);
        if (response?.user) {
          router.push('/explore');
        }
      } catch (e) {
        notifications.error({
          message: ErrorUtils.getErrorMessage(e),
        });
      }
    },
    [router, signInWithEmailAndPassword]
  );

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p="md" mt="md" radius="md">
        <Group mb="md" justify="center">
          <Title order={2} ta="center">
            {t('core.page.signin.title')}
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            {t.rich('core.page.signin.description', {
              link: (chunks) => (
                <Anchor component={Link} size="sm" href="/signup">
                  {chunks}
                </Anchor>
              ),
            })}
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
                {ErrorUtils.getErrorMessage(error)}
              </Alert>
            )}
            <Button loading={loading} fullWidth mt="xl" type="submit">
              {t('shared.button.signin')}
            </Button>
          </Form>
        </FormContext>
      </Paper>
    </Container>
  );
};
