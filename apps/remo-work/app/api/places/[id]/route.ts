import { isAuthenticated } from '~workspace/lib/common/auth/server';
import {
  deletePlace,
  readPlace,
  updatePlace,
} from '~workspace/lib/feature/place/server';

import '../../initFirebase';

export const GET = async (req: Request, params: { params: { id: string } }) => {
  return readPlace(req, params);
};

export const DELETE = async (
  req: Request,
  params: { params: { id: string } }
) => {
  const { error, user } = await isAuthenticated(req);
  if (!user) {
    return error;
  }
  return deletePlace(req, params);
};

export const POST = async (
  req: Request,
  params: { params: { id: string } }
) => {
  const { error, user } = await isAuthenticated(req);
  if (!user) {
    return error;
  }
  return updatePlace(req, user, params);
};
