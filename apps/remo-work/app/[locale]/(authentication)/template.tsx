'use client';

import { useEffect } from 'react';

import { Anchor, Flex } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { useAuthCtx } from '~workspace/lib/common/auth';
import { Image } from '~workspace/lib/shared/ui';

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
        <Image
          src="/images/logo-column.svg"
          alt="logo"
          width={360}
          height={120}
        />
      </Anchor>
      {children}
    </Flex>
  );
}
