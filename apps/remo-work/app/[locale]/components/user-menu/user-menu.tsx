'use client';

import { useSignOut } from 'react-firebase-hooks/auth';

import { Avatar, UnstyledButton, Group, Text, Menu, rem } from '@mantine/core';
import { IconLogout, IconChevronDown } from '@tabler/icons-react';
import { getAuth } from 'firebase/auth';
import { useTranslations } from 'next-intl';

import { useAuthCtx } from '~workspace/lib/common/auth';

export const UserMenu = ({ fallback }: { fallback: React.ReactNode }) => {
  const t = useTranslations();
  const { self } = useAuthCtx();
  const [signOut] = useSignOut(getAuth());

  if (!self) {
    return <>{fallback}</>;
  }

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton>
          <Group gap={7}>
            <Avatar
              src={self?.photoURL || 'https://placehold.co/48x48'}
              alt={self?.displayName || 'user profile'}
              radius="xl"
              size={20}
            />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {self?.displayName || self?.email}
            </Text>
            <IconChevronDown
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={signOut}
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          {t('shared.button.signout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
