'use client';

import { useCallback, useState } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from 'react-firebase-hooks/auth';

import {
  Paper,
  Title,
  Text,
  Container,
  Button,
  Alert,
  Anchor,
  Group,
  Flex,
} from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { IconAlertTriangle } from '@tabler/icons-react';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { notifications } from '~workspace/lib/shared/ui';
import { ErrorUtils } from '~workspace/lib/shared/utils';

import { Fields } from './fields';
import { FormContext, FormType, validator } from './validator';

export const Signup = () => {
  const t = useTranslations();
  const [verificationSent, setVerificationSent] = useState(false);
  const [createUserWithEmailAndPassword, _, creating, errorCreation] =
    useCreateUserWithEmailAndPassword(getAuth());
  const [sendEmailVerification, sendingEmail, errorSendEmail] =
    useSendEmailVerification(getAuth());

  const form = useForm<FormType>({
    initialValues: {
      username: '',
      password: '',
      confirmationPassword: '',
      email: '',
      tos: false,
    },
    validate: validator(t),
  });

  const submitHandler = useCallback(
    async ({ email, password }: FormType) => {
      try {
        const response = await createUserWithEmailAndPassword(email, password);
        if (response?.user) {
          const sent = await sendEmailVerification({
            url: window.location.origin,
          });
          setVerificationSent(sent);
        }
      } catch (e) {
        notifications.error({
          message: ErrorUtils.getErrorMessage(e),
        });
      }
    },
    [createUserWithEmailAndPassword, sendEmailVerification]
  );

  return (
    <Container size={420} my={40}>
      {!verificationSent ? (
        <Paper withBorder shadow="md" p="md" mt="md" radius="md">
          <Group mb="md" justify="center">
            <Title order={2} ta="center">
              {t('core.page.signup.title')}
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
              {t.rich('core.page.signup.description', {
                link: (chunks) => (
                  <Anchor size="sm" href="/signin">
                    {chunks}
                  </Anchor>
                ),
              })}
            </Text>
          </Group>
          <FormContext form={form}>
            <Form onSubmit={submitHandler} form={form} noValidate>
              <Fields />
              {!!(errorCreation || errorSendEmail) && (
                <Alert
                  mt="xl"
                  color="red"
                  title={t('shared.action.error', {
                    entity: t('shared.button.signup'),
                  })}
                  icon={<IconAlertTriangle />}
                >
                  {ErrorUtils.getErrorMessage(errorCreation || errorSendEmail)}
                </Alert>
              )}
              <Button
                fullWidth
                mt="xl"
                loading={creating || sendingEmail}
                type="submit"
              >
                {t('shared.button.create')}
              </Button>
            </Form>
          </FormContext>
        </Paper>
      ) : (
        <Paper withBorder shadow="md" p="md" mt="md" radius="md">
          <Flex direction="column" align="center" gap="md">
            <Group mb="md" justify="center">
              <Title order={2} ta="center">
                {t('core.page.verificationSent.title')}
              </Title>
              <Text>{t('core.page.verificationSent.description')}</Text>
            </Group>
            <Button component={Link} href="/search">
              {t('shared.action.goTo', {
                entity: t('shared.entity.map', { count: 1 }),
              })}
            </Button>
          </Flex>
        </Paper>
      )}
    </Container>
  );
};
