import { readPlaces } from '~workspace/lib/feature/place/server';

import '../initFirebase';

export const GET = async (req: Request) => {
  return readPlaces(req);
};
