import { useCallback } from 'react';

import { useTranslations } from 'use-intl';

import { notifications } from '~workspace/lib/shared/ui';
import { ErrorUtils, useApiMutation } from '~workspace/lib/shared/utils';

import { PlaceAddRequest, PlaceAddResponse } from '../../../../shared';

export const useCreatePlace = () => {
  const t = useTranslations();
  const { data, loading, trigger } = useApiMutation<
    PlaceAddRequest,
    PlaceAddResponse
  >(`/api/places`, {
    onSuccess: useCallback(() => {
      notifications.success({
        title: t('place.component.placeEditor.notification.placeSaved.title'),
        message: t(
          'place.component.placeEditor.notification.placeSaved.description'
        ),
      });
    }, [t]),
    onFailure: useCallback(
      (e: unknown) => {
        notifications.error({
          title: t(
            'place.component.placeEditor.notification.placeFailedToSaved.title'
          ),
          message: t(
            'place.component.placeEditor.notification.placeFailedToSaved.description',
            { error: t(ErrorUtils.getErrorMessage(e)) }
          ),
        });
      },
      [t]
    ),
  });

  const createPlace = useCallback(
    (payload: PlaceAddRequest) => {
      trigger(payload);
    },
    [trigger]
  );

  return { data, loading, createPlace };
};
