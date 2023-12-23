'use client';

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Button,
  Group,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Places } from './modules';
import { MapProvider } from './modules/map';
import { PlaceProvider } from './modules/place';
import { Header, UserMenu } from '../components';

export default function Layout({ children }: { children: React.ReactNode[] }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const t = useTranslations();

  return (
    <MapProvider
      options={{
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
        libraries: ['places'],
      }}
    >
      <PlaceProvider maxZoom={15}>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: { sm: 360, md: '50%' },
            breakpoint: 'sm',
            collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
          }}
        >
          <AppShellHeader>
            <Header
              withBurgerControl
              mobileOpened={mobileOpened}
              toggleMobile={toggleMobile}
              desktopOpened={desktopOpened}
              toggleDesktop={toggleDesktop}
              aside={
                <UserMenu
                  fallback={
                    <Group ml="xl" visibleFrom="sm">
                      <Button component={Link} href="/signin">
                        {t('shared.button.signin')}
                      </Button>
                    </Group>
                  }
                />
              }
            />
          </AppShellHeader>
          <AppShellNavbar p="md">
            <Places />
          </AppShellNavbar>
          <AppShellMain pt={`calc(${rem(60)})`} h={`calc(100vh - 60px)`}>
            {children}
          </AppShellMain>
        </AppShell>
      </PlaceProvider>
    </MapProvider>
  );
}
