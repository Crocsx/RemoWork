import { Anchor, Checkbox, Group, TextInput, Fieldset } from '@mantine/core';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useFormContext } from './validator';

export function Fields() {
  const t = useTranslations();
  const { getInputProps } = useFormContext();

  return (
    <Fieldset>
      <TextInput
        withAsterisk
        label={t('shared.entity.username', { count: 1 })}
        placeholder={t('shared.entity.username', { count: 1 })}
        {...getInputProps('username')}
      />

      <TextInput
        withAsterisk
        label={t('shared.entity.email', { count: 1 })}
        placeholder="your@email.com"
        {...getInputProps('email')}
      />

      <TextInput
        withAsterisk
        label={t('shared.entity.password', { count: 1 })}
        placeholder={t('shared.entity.password', { count: 1 })}
        type="password"
        autoComplete="new-password"
        {...getInputProps('password')}
      />

      <TextInput
        withAsterisk
        label={t('shared.action.confirm', {
          entity: t('shared.entity.password', { count: 1 }),
        })}
        placeholder={t('shared.action.confirm', {
          entity: t('shared.entity.password', { count: 1 }),
        })}
        type="password"
        autoComplete="new-password"
        {...getInputProps('confirmationPassword')}
      />

      <Group justify="space-between" mt="lg">
        <Checkbox
          {...getInputProps('tos')}
          label={t.rich('core.page.signup.tos', {
            privacy: (chunks) => (
              <Anchor component={Link} size="sm" href={'/privacy'}>
                {chunks}
              </Anchor>
            ),
            terms: (chunks) => (
              <Anchor component={Link} size="sm" href={'/terms'}>
                {chunks}
              </Anchor>
            ),
          })}
        />
      </Group>
    </Fieldset>
  );
}
