import { isAuthenticated } from '~workspace/lib/common/auth/server';
import { readPlaces } from '~workspace/lib/feature/place/server';

import '../initFirebase';

export const GET = async (req: Request) => {
  const authError = await isAuthenticated(req);
  if (authError) {
    return authError;
  }
  return readPlaces(req);
};
