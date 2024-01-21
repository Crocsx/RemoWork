import { createFormContext, isNotEmpty } from '@mantine/form';
import { FormValidateInput } from '@mantine/form/lib/types';
import { TranslationValues } from 'next-intl';

export interface FormType {
  reason: string;
}

export const [FormContext, useFormContext, useForm] =
  createFormContext<FormType>();

export const validator: (
  t: (key: string, options?: TranslationValues) => string
) => FormValidateInput<FormType> = (t) => {
  return {
    reason: isNotEmpty(
      t('shared.form.validation.error.required', {
        field: t('shared.entity.reason', { count: 1 }),
      })
    ),
  };
};
