'use client';

import { useEffect } from 'react';

import { Anchor, Flex, rem } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import { useAuthCtx } from '~workspace/lib/common/auth';

export default function Template({ children }: { children: React.ReactNode }) {
  const { authenticated } = useAuthCtx();
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.push('/search');
    }
  }, [authenticated, router]);

  return (
    <Flex direction="column" align="center">
      <Anchor href="/" mt="xl">
        <Icon123 width={rem(60)} />
      </Anchor>
      {children}
    </Flex>
  );
}
