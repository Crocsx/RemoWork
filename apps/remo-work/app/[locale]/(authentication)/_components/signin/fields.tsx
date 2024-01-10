import { Checkbox, Group, TextInput, Fieldset, Anchor } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useFormContext } from './validator';

export function Fields() {
  const t = useTranslations();
  const { getInputProps } = useFormContext();

  return (
    <Fieldset>
      <TextInput
        required
        label={t('shared.entity.email', { count: 1 })}
        placeholder="your@email.com"
        {...getInputProps('email')}
      />
      <TextInput
        withAsterisk
        label={t('shared.entity.password', { count: 1 })}
        placeholder={t('shared.entity.password', { count: 1 })}
        type="password"
        {...getInputProps('password')}
      />
      <Group justify="space-between" mt="lg">
        <Checkbox
          label={t('core.page.signin.rememberMe')}
          {...getInputProps('rememberMe')}
        />
        <Anchor size="sm" href={'/recovery'}>
          {t('core.page.signin.recovery')}
        </Anchor>
      </Group>
    </Fieldset>
  );
}
