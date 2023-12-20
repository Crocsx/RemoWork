import { checkAuth, setAuth } from '~workspace/lib/common/auth/server';

import '../initFirebase';

export async function GET(req: Request) {
  return checkAuth(req);
}

export async function POST(req: Request) {
  return setAuth(req);
}
