'use client';

import { Burger, Container, Group, UnstyledButton } from '@mantine/core';

import { Image } from '~workspace/lib/shared/ui';

export const Header = ({
  withBurgerControl,
  mobileOpened,
  toggleMobile,
  aside,
}: {
  withBurgerControl?: boolean;
  mobileOpened?: boolean;
  toggleMobile?: () => void;
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
            </>
          )}
          <UnstyledButton component="a" href="/">
            <Image
              src="/images/logo-line.svg"
              alt="logo"
              width={180}
              height={32}
            />
          </UnstyledButton>
        </Group>
        {aside}
      </Group>
    </Container>
  );
};
