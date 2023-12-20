'use client';

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import {
  Paper,
  Title,
  Text,
  Container,
  Button,
  Alert,
  Anchor,
  Group,
} from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import { IconAlertTriangle } from '@tabler/icons-react';
import { getAuth } from 'firebase/auth';
import { useTranslations } from 'next-intl';

import { Fields } from './fields';
import { FormContext, FormType, validator } from './validator';

export const Signup = () => {
  const t = useTranslations();
  const [createUserWithEmailAndPassword, _, loading, error] =
    useCreateUserWithEmailAndPassword(getAuth());
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

  const submitHandler = ({ email, password }: FormType) => {
    createUserWithEmailAndPassword(email, password);
  };

  return (
    <Container size={420} my={40}>
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
            {error && (
              <Alert
                mt="xl"
                color="red"
                title={t('shared.action.error', {
                  entity: t('shared.button.signup'),
                })}
                icon={<IconAlertTriangle />}
              >
                {error.code}
              </Alert>
            )}
            <Button fullWidth mt="xl" loading={loading} type="submit">
              {t('shared.button.create')}
            </Button>
          </Form>
        </FormContext>
      </Paper>
    </Container>
  );
};
