'use client';

import { useEffect } from 'react';

import { Anchor, Flex } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import { useAuthCtx } from '~workspace/lib/common/auth';

export default function Template({ children }: { children: React.ReactNode }) {
  const { authenticated } = useAuthCtx();
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.push('/map');
    }
  }, [authenticated, router]);

  return (
    <Flex direction="column" align="center">
      <Anchor href="/" mt="xl">
        <Icon123 width={60} />
      </Anchor>
      {children}
    </Flex>
  );
}
