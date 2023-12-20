import { createFormContext, isNotEmpty } from '@mantine/form';
import { FormValidateInput } from '@mantine/form/lib/types';
import { TranslationValues } from 'next-intl';

import {
  CertaintyLevel,
  SpeedLevel,
  NoiseLevel,
  QuantityLevel,
  ComfortLevel,
  PricingModel,
} from '~workspace/lib/feature/place';

export interface FormType {
  id: string;
  name: string;
  longitude?: number;
  latitude?: number;
  illustration?: string;
  address?: string;
  priceModel?: PricingModel;
  wifiAvailability?: CertaintyLevel;
  wifiLogin?: string;
  wifiPassword?: string;
  wifiSpeed?: SpeedLevel;
  noiseLevel?: NoiseLevel;
  talkingAllowed?: CertaintyLevel;
  plugsQuantity?: QuantityLevel;
  comfortLevel?: ComfortLevel;
  tags?: string[];
}

export const [FormContext, useFormContext, useForm] =
  createFormContext<FormType>();

export const validator: (
  t: (key: string, options?: TranslationValues) => string
) => FormValidateInput<FormType> = (t) => {
  return {
    name: isNotEmpty(
      t('shared.form.validation.error.required', {
        field: t('shared.entity.name', { count: 1 }),
      })
    ),
    longitude: isNotEmpty(),
    latitude: isNotEmpty(),
    id: isNotEmpty(),
  };
};
