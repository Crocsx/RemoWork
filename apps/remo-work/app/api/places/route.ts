import { isAuthenticated } from '~workspace/lib/common/auth/server';
import { placeAdd, placesGet } from '~workspace/lib/feature/place/server';

import '../initFirebaseAdmin';

export const GET = async (req: Request) => {
  return placesGet(req);
};

export const PUT = async (req: Request) => {
  const { error, user } = await isAuthenticated(req);
  if (!user) {
    return error;
  }
  return placeAdd(req, user);
};
