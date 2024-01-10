import { TextInput, Fieldset } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useFormContext } from './validator';

export function Fields() {
  const t = useTranslations('shared');
  const { getInputProps } = useFormContext();

  return (
    <Fieldset>
      <TextInput
        required
        label={t('entity.email', { count: 1 })}
        placeholder="your@email.com"
        {...getInputProps('email')}
      />
    </Fieldset>
  );
}
