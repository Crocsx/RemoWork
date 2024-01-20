import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import util from 'util';

import { PlaceReportResponse } from '../../../shared';

export async function placeReport(
  req: Request,
  { params }: { params: { placeId: string } },
  {
    userId,
    email,
    transporter,
  }: { userId: string; email: string; transporter: nodemailer.Transporter }
) {
  try {
    const id = params.placeId;
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'place.api.error.idRequired' },
        { status: 400 }
      );
    }

    const { reason }: { reason: string } = await req.json();

    const sendMailAsync = util
      .promisify(transporter.sendMail)
      .bind(transporter);

    await sendMailAsync({
      from: email,
      to: email,
      subject: 'Remo-Work : A place has been reported',
      text: `The place ${id} has been reported for the following reason ${reason} by ${userId}`,
    });

    return NextResponse.json<PlaceReportResponse>(
      { sent: true },
      { status: 200 }
    );
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return NextResponse.json(
      { error: 'shared.api.error.internalError' },
      { status: 500 }
    );
  }
}
