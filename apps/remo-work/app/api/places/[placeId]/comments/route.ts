import { isAuthenticated } from '~workspace/lib/common/auth/server';
import {
  placeCommentAdd,
  placeCommentsGet,
} from '~workspace/lib/feature/place/server';

export const GET = async (
  req: Request,
  { params }: { params: { placeId: string } }
) => {
  return placeCommentsGet(req, params?.placeId);
};

export const PUT = async (
  req: Request,
  params: { params: { placeId: string } }
) => {
  const { error, user } = await isAuthenticated();

  if (!user) {
    return error;
  }

  return placeCommentAdd(req, params, {
    userId: user.uid,
  });
};
