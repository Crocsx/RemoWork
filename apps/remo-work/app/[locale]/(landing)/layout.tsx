import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Button,
  Group,
} from '@mantine/core';
import { useTranslations } from 'next-intl';

import { Footer, Header, UserMenu } from '~workspace/app/remo-work/src';

export default function Layout({ children }: { children: React.ReactNode[] }) {
  const t = useTranslations();

  return (
    <AppShell
      transitionDuration={0}
      header={{
        height: 60,
        offset: true,
      }}
    >
      <AppShellHeader bg="secondary.0">
        <Header
          aside={
            <UserMenu
              fallback={
                <Group ml="xl" gap={0}>
                  <Button component="a" href="/signin">
                    {t('shared.button.signin')}
                  </Button>
                </Group>
              }
            />
          }
        />
      </AppShellHeader>
      <AppShellMain bg="secondary.0">
        {children}
        <Footer />
      </AppShellMain>
    </AppShell>
  );
}
