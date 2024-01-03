import { isAuthenticated } from '~workspace/lib/common/auth/server';
import { createPlace, readPlaces } from '~workspace/lib/feature/place/server';

import '../initFirebase';

export const GET = async (req: Request) => {
  return readPlaces(req);
};

export const PUT = async (req: Request) => {
  const { error, user } = await isAuthenticated(req);
  if (!user) {
    return error;
  }
  return createPlace(req, user);
};
