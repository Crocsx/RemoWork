import { readPlace } from '~workspace/lib/feature/place/server';

import '../../initFirebase';

export const GET = async (req: Request, params: { params: { id: string } }) => {
  return readPlace(req, params);
};
