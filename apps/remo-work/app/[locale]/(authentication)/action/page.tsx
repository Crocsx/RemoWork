'use client';
import { useState, useEffect } from 'react';

import { Alert, Button, Flex, LoadingOverlay, Paper } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import {
  getAuth,
  checkActionCode,
  ActionCodeInfo,
  ActionCodeOperation,
} from 'firebase/auth';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { notifications } from '~workspace/lib/shared/ui';
import { ErrorUtils } from '~workspace/lib/shared/utils';

import {
  ResetPassword,
  EmailVerified,
} from '~workspace/app/remo-work/app/(authentication)/_components';

export default function Page() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [oobCode, setOobCode] = useState('');
  const [codeInfo, setCodeinfo] = useState<ActionCodeInfo>();

  useEffect(() => {
    async function verifyToken() {
      try {
        const code = searchParams.get('oobCode');
        if (code) {
          const info = await checkActionCode(getAuth(), code);
          setCodeinfo(info);
          setOobCode(code);
        }
      } catch (e) {
        notifications.error({
          message: ErrorUtils.getErrorMessage(e),
        });
      } finally {
        setVerifying(false);
      }
    }

    verifyToken();
  }, [searchParams]);

  return (
    <>
      <LoadingOverlay visible={verifying} bg="secondary.0" />
      {!verifying &&
        (codeInfo ? (
          <>
            {codeInfo.operation === ActionCodeOperation.PASSWORD_RESET && (
              <ResetPassword codeInfo={codeInfo} oobCode={oobCode} />
            )}
            {codeInfo.operation === ActionCodeOperation.VERIFY_EMAIL && (
              <EmailVerified codeInfo={codeInfo} oobCode={oobCode} />
            )}
            {codeInfo.operation ===
              ActionCodeOperation.VERIFY_AND_CHANGE_EMAIL && (
              <EmailVerified codeInfo={codeInfo} oobCode={oobCode} />
            )}
          </>
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
              <Alert
                mt="xl"
                color="red"
                title={t('core.page.action.error.title')}
                icon={<IconAlertTriangle />}
              >
                {t('core.page.action.error.description')}
              </Alert>
              <Button component={Link} href="/signin">
                {t('shared.action.goTo', {
                  entity: t('shared.button.signin'),
                })}
              </Button>
            </Flex>
          </Paper>
        ))}
    </>
  );
}
