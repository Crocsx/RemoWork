'use client';

import { Burger, Container, Group, UnstyledButton } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';

export const Header = ({
  withBurgerControl,
  mobileOpened,
  desktopOpened,
  toggleMobile,
  toggleDesktop,
  aside,
}: {
  withBurgerControl?: boolean;
  mobileOpened?: boolean;
  desktopOpened?: boolean;
  toggleMobile?: () => void;
  toggleDesktop?: () => void;
  aside?: React.ReactNode;
}) => {
  return (
    <Container fluid py="sm">
      <Group justify="space-between">
        <Group h="100%" px="md">
          {withBurgerControl && (
            <>
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="sm"
                size="sm"
              />
              <Burger
                opened={desktopOpened}
                onClick={toggleDesktop}
                visibleFrom="sm"
                size="sm"
              />
            </>
          )}
          <UnstyledButton component="a" href="/">
            <Icon123 size={28} />
          </UnstyledButton>
        </Group>
        {aside}
      </Group>
    </Container>
  );
};
