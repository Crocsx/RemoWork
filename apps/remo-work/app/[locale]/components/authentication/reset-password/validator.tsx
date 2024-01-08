import { createFormContext, isNotEmpty, matchesField } from '@mantine/form';
import { FormValidateInput } from '@mantine/form/lib/types';
import { TranslationValues } from 'next-intl';

import { combineValidators } from '~workspace/lib/shared/utils';

export interface FormType {
  password: string;
  oobCode: string;
}

export const [FormContext, useFormContext, useForm] =
  createFormContext<FormType>();

export const validator: (
  t: (key: string, options?: TranslationValues) => string
) => FormValidateInput<FormType> = (t) => {
  return {
    password: isNotEmpty(
      t('shared.form.validation.error.required', {
        field: t('shared.entity.password', { count: 1 }),
      })
    ),
    confirmationPassword: combineValidators(
      isNotEmpty(
        t('shared.form.validation.error.required', {
          ns: 'shared',
          field: t('shared.action.confirm', {
            entity: t('shared.entity.password', { count: 1, ns: 'shared' }),
            ns: 'shared',
          }),
        })
      ),
      matchesField(
        'password',
        t('shared.form.validation.error.notMatch', {
          field1: t('shared.action.confirm', {
            entity: t('shared.entity.password', { count: 1 }),
          }),
          field2: t('shared.entity.password', { count: 1 }),
        })
      )
    ),
  };
};
