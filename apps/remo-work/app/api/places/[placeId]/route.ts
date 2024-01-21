import { isAuthenticated } from '~workspace/lib/common/auth/server';
import {
  placeDelete,
  placeGet,
  placeUpdate,
} from '~workspace/lib/feature/place/server';

export const GET = async (req: Request, params: { params: { id: string } }) => {
  return placeGet(req, params);
};

export const DELETE = async (
  req: Request,
  params: { params: { placeId: string } }
) => {
  const { error, user } = await isAuthenticated(req);
  if (!user) {
    return error;
  }
  return placeDelete(req, params);
};

export const POST = async (
  req: Request,
  params: { params: { placeId: string } }
) => {
  const { error, user } = await isAuthenticated(req);
  if (!user) {
    return error;
  }
  return placeUpdate(req, user, params);
};
