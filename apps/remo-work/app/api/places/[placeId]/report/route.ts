import nodemailer from 'nodemailer';

import { isAuthenticated } from '~workspace/lib/common/auth/server';
import { placeReport } from '~workspace/lib/feature/place/server';

export const POST = async (
  req: Request,
  params: { params: { placeId: string } }
) => {
  const { error, user } = await isAuthenticated();
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

  return placeReport(req, params, {
    userId: user.uid,
    transporter,
    email: process.env.NEXT_GOOGLE_MAIL_ADDRESS,
  });
};
