import { createFormContext, isEmail, isNotEmpty } from '@mantine/form';
import { FormValidateInput } from '@mantine/form/lib/types';
import { TranslationValues } from 'next-intl';

export interface FormType {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const [FormContext, useFormContext, useForm] =
  createFormContext<FormType>();

export const validator: (
  t: (key: string, options?: TranslationValues) => string
) => FormValidateInput<FormType> = (t) => {
  return {
    email: isEmail(
      t('shared.form.validation.error.invalid', {
        field: t('shared.entity.email', { count: 1 }),
      })
    ),
    password: isNotEmpty(
      t('shared.form.validation.error.required', {
        field: t('shared.entity.password', { count: 1 }),
      })
    ),
  };
};
