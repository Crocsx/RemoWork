import { createFormContext, isEmail } from '@mantine/form';
import { FormValidateInput } from '@mantine/form/lib/types';
import { TranslationValues } from 'next-intl';

export interface FormType {
  email: string;
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
  };
};
