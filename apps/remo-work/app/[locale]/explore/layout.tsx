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

import { Places } from './components';
import { MapProvider, PlaceProvider } from './context';
import { Header, UserMenu } from '../components';

export default function Layout({ children }: { children: React.ReactNode[] }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
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
            collapsed: { mobile: !mobileOpened, desktop: false },
          }}
        >
          <AppShellHeader bg="secondary.0">
            <Header
              withBurgerControl
              mobileOpened={mobileOpened}
              toggleMobile={toggleMobile}
              aside={
                <UserMenu
                  fallback={
                    <Group ml="xl">
                      <Button component={Link} href="/signin">
                        {t('shared.button.signin')}
                      </Button>
                    </Group>
                  }
                />
              }
            />
          </AppShellHeader>
          <AppShellNavbar p="md" bg="secondary.0">
            <Places />
          </AppShellNavbar>
          <AppShellMain
            pt={`calc(${rem(60)})`}
            h={`calc(100vh - 60px)`}
            bg="secondary.0"
          >
            {children}
          </AppShellMain>
        </AppShell>
      </PlaceProvider>
    </MapProvider>
  );
}
