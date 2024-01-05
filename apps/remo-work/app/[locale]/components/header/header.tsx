'use client';

import {
  Burger,
  Container,
  Group,
  UnstyledButton,
  Text,
  Flex,
  useMantineTheme,
} from '@mantine/core';

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
  const {
    other: { logo },
  } = useMantineTheme();

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
              {logo({ width: '2rem', height: '2rem' })}
            </Flex>
          </UnstyledButton>
        </Group>
        {aside}
      </Group>
    </Container>
  );
};
