import { isAuthenticated } from '~workspace/lib/common/auth/server';
import { PlacesGetRequest } from '~workspace/lib/feature/place';
import { placesGet, placeAdd } from '~workspace/lib/feature/place/server';
import { readQueryString } from '~workspace/lib/shared/utils';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const requestParams = readQueryString<PlacesGetRequest>(searchParams);

  return placesGet(requestParams);
};

export const PUT = async (req: Request) => {
  const { error, user } = await isAuthenticated();
  if (!user) {
    return error;
  }
  return placeAdd(req, user);
};
