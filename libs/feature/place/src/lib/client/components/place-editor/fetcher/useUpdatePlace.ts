import { useCallback } from 'react';

import { useTranslations } from 'use-intl';

import { notifications } from '~workspace/lib/shared/ui';
import { ErrorUtils, useApiMutation } from '~workspace/lib/shared/utils';

import { PlaceUpdateRequest, PlaceUpdateResponse } from '../../../../shared';

export const useUpdatePlace = () => {
  const t = useTranslations();
  const { data, loading, trigger } = useApiMutation<
    PlaceUpdateRequest,
    PlaceUpdateResponse
  >(`/api/places`, {
    onSuccess: useCallback(() => {
      notifications.success({
        title: t('place.component.placeEditor.notification.placeUpdated.title'),
        message: t(
          'place.component.placeEditor.notification.placeUpdated.description'
        ),
      });
    }, [t]),
    onFailure: useCallback(
      (e: unknown) => {
        notifications.error({
          title: t(
            'place.component.placeEditor.notification.placeFailedToUpdate.title'
          ),
          message: t(
            'place.component.placeEditor.notification.placeFailedToUpdate.description',
            { error: t(ErrorUtils.getErrorMessage(e)) }
          ),
        });
      },
      [t]
    ),
  });

  const updatePlace = useCallback(
    (payload: PlaceUpdateRequest) => {
      trigger(payload);
    },
    [trigger]
  );

  return { data, loading, updatePlace };
};
