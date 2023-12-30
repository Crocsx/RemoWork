'use client';

import { useEffect } from 'react';

import { Anchor, Flex } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { useAuthCtx } from '~workspace/lib/common/auth';
import { Image } from '~workspace/lib/shared/ui';

import logoColumn from '~workspace/app/remo-work/public/images/logo-column.svg';

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
        <Image src={logoColumn} alt="logo" height={120} />
      </Anchor>
      {children}
    </Flex>
  );
}
