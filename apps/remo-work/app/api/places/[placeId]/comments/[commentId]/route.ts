import { isAuthenticated } from '~workspace/lib/common/auth/server';
import {
  placeCommentDelete,
  placeCommentUpdate,
} from '~workspace/lib/feature/place/server';

import '../../../initFirebaseAdmin';

export const DELETE = async (
  req: Request,
  params: { params: { placeId: string; commentId: string } }
) => {
  const { error, user } = await isAuthenticated(req);
  if (!user) {
    return error;
  }
  return placeCommentDelete(req, params);
};

export const POST = async (
  req: Request,
  params: { params: { placeId: string; commentId: string } }
) => {
  const { error, user } = await isAuthenticated(req);
  if (!user) {
    return error;
  }
  return placeCommentUpdate(req, params);
};
