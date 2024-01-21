'use client';

import { Anchor, Flex, useMantineTheme } from '@mantine/core';

export default function Template({ children }: { children: React.ReactNode }) {
  const {
    other: { logo },
  } = useMantineTheme();

  return (
    <Flex direction="column" align="center">
      <Anchor href="/" mt="xl">
        {logo({ width: '5rem', height: '5rem' })}
      </Anchor>
      {children}
    </Flex>
  );
}
