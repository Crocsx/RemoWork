import { isAuthenticated } from '~workspace/lib/common/auth/server';
import {
  placeDelete,
  placeGet,
  placeUpdate,
} from '~workspace/lib/feature/place/server';

export const GET = async (
  req: Request,
  { params }: { params: { placeId: string } }
) => {
  return placeGet(req, params?.placeId);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { placeId: string } }
) => {
  const { error, user } = await isAuthenticated();
  if (!user) {
    return error;
  }
  return placeDelete(req, params?.placeId);
};

export const POST = async (
  req: Request,
  { params }: { params: { placeId: string } }
) => {
  const { error, user } = await isAuthenticated();
  if (!user) {
    return error;
  }
  return placeUpdate(req, user, params?.placeId);
};
