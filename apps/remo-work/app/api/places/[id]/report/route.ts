import nodemailer from 'nodemailer';

import { isAuthenticated } from '~workspace/lib/common/auth/server';
import { reportPlace } from '~workspace/lib/feature/place/server';

import '../../../initFirebaseAdmin';

export const POST = async (
  req: Request,
  params: { params: { id: string } }
) => {
  const { error, user } = await isAuthenticated(req);
  if (!user) {
    return error;
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_GOOGLE_MAIL_ADDRESS,
      pass: process.env.NEXT_GOOGLE_MAIL_PASSWORD,
    },
  });

  return reportPlace(req, params, {
    userId: user.uid,
    transporter,
    email: process.env.NEXT_GOOGLE_MAIL_ADDRESS,
  });
};
