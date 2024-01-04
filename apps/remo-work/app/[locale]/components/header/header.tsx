'use client';

import {
  Burger,
  Container,
  Group,
  UnstyledButton,
  Text,
  Flex,
} from '@mantine/core';

import { Image } from '~workspace/lib/shared/ui';

import logo from '~workspace/app/remo-work/public/images/logo.svg';

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
            <Flex justify="center" align="center">
              <Text fw="bold" mr="sm" tt="uppercase">
                Remo-Work
              </Text>
              <Image src={logo} alt="logo" height={32} />
            </Flex>
          </UnstyledButton>
        </Group>
        {aside}
      </Group>
    </Container>
  );
};
