'use client';

import { useEffect } from 'react';

import { Anchor, Flex, useMantineTheme } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { useAuthCtx } from '~workspace/lib/common/auth';

export default function Template({ children }: { children: React.ReactNode }) {
  const { self, authenticated } = useAuthCtx();
  const router = useRouter();
  const {
    other: { logo },
  } = useMantineTheme();

  useEffect(() => {
    if (authenticated && self?.emailVerified) {
      // router.push('/explore');
    }
  }, [authenticated, router, self?.emailVerified]);

  return (
    <Flex direction="column" align="center">
      <Anchor href="/" mt="xl">
        {logo({ width: '5rem', height: '5rem' })}
      </Anchor>
      {children}
    </Flex>
  );
}
