'use client';

import {
  Paper,
  Title,
  Text,
  Container,
  Button,
  Group,
  Flex,
} from '@mantine/core';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const Verified = () => {
  const t = useTranslations();

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p="md" mt="md" radius="md" bg="secondary.2">
        <Flex direction="column" align="center" gap="md">
          <Group mb="md" justify="center">
            <Title order={2} ta="center">
              {t('core.page.verified.title')}
            </Title>
            <Text>{t('core.page.verified.description')}</Text>
          </Group>
          <Button component={Link} href="/explore">
            {t('shared.action.goTo', {
              entity: t('shared.entity.map', { count: 1 }),
            })}
          </Button>
        </Flex>
      </Paper>
    </Container>
  );
};
