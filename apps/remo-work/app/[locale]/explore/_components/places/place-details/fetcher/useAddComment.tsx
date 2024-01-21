import { useCallback } from 'react';

import {
  PlaceCommentAddRequest,
  PlaceCommentAddResponse,
} from '~workspace/lib/feature/place';
import { useApiMutation } from '~workspace/lib/shared/utils';

export const useAddComment = ({ placeId }: { placeId: string }) => {
  const { data, loading, trigger } = useApiMutation<
    PlaceCommentAddRequest,
    PlaceCommentAddResponse
  >(`/api/places/${placeId}/comments`, {
    method: 'PUT',
  });

  const sendComment = useCallback(
    async (payload: PlaceCommentAddRequest) => {
      return await trigger(payload);
    },
    [trigger]
  );

  return { data, loading, sendComment };
};
