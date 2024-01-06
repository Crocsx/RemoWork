'use client';

import { useCallback, useState } from 'react';
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
  Flex,
  UnstyledButton,
} from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { useInterval } from '@mantine/hooks';
import { IconAlertTriangle, IconArrowLeft } from '@tabler/icons-react';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Fields } from './fields';
import { FormContext, FormType, validator } from './validator';

export const Recovery = () => {
  const t = useTranslations();
  const [emailSent, setEmailSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const { start, stop } = useInterval(() => {
    setTimer((value) => {
      if (value > 0) {
        return value - 1;
      } else {
        stop();
        return 0;
      }
    });
  }, 1000);
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
    async ({ email }: FormType) => {
      await sendPasswordResetEmail(email);
      setEmailSent(true);
      start();
    },
    [sendPasswordResetEmail, start]
  );

  return (
    <Container size={420} my={40}>
      {!emailSent ? (
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
                {t('core.page.recovery.notification.emailSent.title')}
              </Title>
              <Text>
                {t('core.page.recovery.notification.emailSent.description')}
              </Text>
              {t.rich('core.page.recovery.notification.emailSent.resend', {
                timer,
                interaction: (chunks) => (
                  <UnstyledButton
                    disabled={timer > 0}
                    size="sm"
                    onClick={() => submitHandler(form.values)}
                    display="contents"
                  >
                    {chunks}
                  </UnstyledButton>
                ),
              })}
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
