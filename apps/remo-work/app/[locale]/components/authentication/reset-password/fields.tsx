import { TextInput, Fieldset } from '@mantine/core';
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
    </Fieldset>
  );
}
