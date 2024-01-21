import { PlaceGetResponse } from '~workspace/lib/feature/place';
import { useApiRequest } from '~workspace/lib/shared/utils';

export const useGetPlace = ({ placeId }: { placeId: string }) => {
  const {
    data: place,
    loading,
    error,
  } = useApiRequest<PlaceGetResponse>(`/api/places/${placeId}`);

  return { place, loading, error };
};
