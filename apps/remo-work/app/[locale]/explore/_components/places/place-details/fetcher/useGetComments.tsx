import { useCallback } from 'react';

import {
  PlaceCommentAddRequest,
  PlaceCommentsGetResponse,
} from '~workspace/lib/feature/place';
import {
  createQueryString,
  useApiRequestLazy,
} from '~workspace/lib/shared/utils';

export const useGetComments = ({ placeId }: { placeId: string }) => {
  const {
    data: comments,
    loading,
    execute,
  } = useApiRequestLazy<PlaceCommentsGetResponse>();

  const getComments = useCallback(
    async (payload?: PlaceCommentAddRequest) => {
      return await execute(
        `/api/places/${placeId}/comments${
          payload ? `?${createQueryString(payload)}` : ``
        }`
      );
    },
    [execute, placeId]
  );

  return { comments, loading, getComments };
};
