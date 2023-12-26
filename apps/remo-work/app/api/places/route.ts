import { isAuthenticated } from '~workspace/lib/common/auth/server';
import {
  createPlace,
  deletePlace,
  readPlaces,
  updatePlace,
} from '~workspace/lib/feature/place/server';

import '../initFirebase';

export const GET = async (req: Request) => {
  return readPlaces(req);
};

export const DELETE = async (req: Request) => {
  const authError = await isAuthenticated(req);
  if (authError) {
    return authError;
  }
  return deletePlace(req);
};

export const POST = async (req: Request) => {
  const authError = await isAuthenticated(req);
  if (authError) {
    return authError;
  }
  return updatePlace(req);
};

export const PUT = async (req: Request) => {
  const authError = await isAuthenticated(req);
  if (authError) {
    return authError;
  }
  return createPlace(req);
};
