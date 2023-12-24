import { readPlace } from '~workspace/lib/feature/place/server';

import '../initFirebase';

export const GET = async (req: Request) => {
  return readPlace(req);
};
