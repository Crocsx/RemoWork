import { useCallback } from 'react';

import { useTranslations } from 'use-intl';

import { notifications } from '~workspace/lib/shared/ui';
import { ErrorUtils, useApiMutation } from '~workspace/lib/shared/utils';

import { PlaceReportRequest, PlaceReportResponse } from '../../../../shared';

export const usePlaceReport = ({ placeId }: { placeId: string }) => {
  const t = useTranslations();
  const {
    data,
    loading: reporting,
    trigger,
  } = useApiMutation<PlaceReportRequest, PlaceReportResponse>(
    `/api/places/${placeId}/report`,
    {
      onSuccess: useCallback(() => {
        notifications.success({
          title: t(
            'place.component.placeReport.notification.placeReported.title'
          ),
          message: t(
            'place.component.placeReport.notification.placeReported.description'
          ),
        });
      }, [t]),
      onFailure: useCallback(
        (e: unknown) => {
          notifications.error({
            title: t(
              'place.component.placeReport.notification.placeReported.placeReportedFailure.title'
            ),
            message: t(
              'place.component.placeReport.notification.placeReported.placeReportedFailure.description',
              { error: t(ErrorUtils.getErrorMessage(e)) }
            ),
          });
        },
        [t]
      ),
    }
  );

  const reportPlace = useCallback(
    async (payload: PlaceReportRequest) => {
      trigger(payload);
    },
    [trigger]
  );

  return { data, reporting, reportPlace };
};
