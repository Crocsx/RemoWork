'use client';

import { useEffect } from 'react';

import { Anchor, Flex } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { useAuthCtx } from '~workspace/lib/common/auth';
import { Image } from '~workspace/lib/shared/ui';

import logo from '~workspace/app/remo-work/public/images/logo.svg';

export default function Template({ children }: { children: React.ReactNode }) {
  const { self, authenticated } = useAuthCtx();
  const router = useRouter();

  useEffect(() => {
    if (authenticated && self?.emailVerified) {
      router.push('/explore');
    }
  }, [authenticated, router, self?.emailVerified]);

  return (
    <Flex direction="column" align="center">
      <Anchor href="/" mt="xl">
        <Image src={logo} alt="logo" height={120} />
      </Anchor>
      {children}
    </Flex>
  );
}
