'use client';

import { useEffect, useState } from 'react';

import {
  Paper,
  Title,
  Text,
  Container,
  Button,
  Group,
  Flex,
  LoadingOverlay,
} from '@mantine/core';
import { ActionCodeInfo, applyActionCode, getAuth } from 'firebase/auth';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { notifications } from '~workspace/lib/shared/ui';
import { ErrorUtils } from '~workspace/lib/shared/utils';

export const EmailVerified = ({
  oobCode,
}: {
  codeInfo: ActionCodeInfo;
  oobCode: string;
}) => {
  const t = useTranslations();
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    async function verifyToken() {
      try {
        await applyActionCode(getAuth(), oobCode);
      } catch (e) {
        notifications.error({
          message: ErrorUtils.getErrorMessage(e),
        });
      } finally {
        setVerifying(false);
      }
    }

    verifyToken();
  }, [oobCode]);

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p="md" mt="md" radius="md" bg="secondary.2">
        <LoadingOverlay visible={verifying} bg="secondary.2" />
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
