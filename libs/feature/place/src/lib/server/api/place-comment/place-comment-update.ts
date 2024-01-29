import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { NextResponse } from 'next/server';

import { PlaceCommentUpdateRequest } from '../../../shared';

export async function placeCommentUpdate(
  req: Request,
  { params }: { params: { commentId: string; placeId: string } }
) {
  try {
    const placeId = params.placeId;
    const commentId = params.commentId;
    const { comment }: PlaceCommentUpdateRequest = await req.json();

    if (!placeId || typeof placeId !== 'string') {
      return NextResponse.json(
        { error: 'place.api.error.idRequired' },
        { status: 400 }
      );
    }

    if (!commentId || typeof commentId !== 'string') {
      return NextResponse.json(
        { error: 'place.api.error.idRequired' },
        { status: 400 }
      );
    }

    if (!comment) {
      return NextResponse.json(
        { error: 'place.api.error.commentRequired' },
        { status: 400 }
      );
    }

    const commentRef = await firestore()
      .collection('places')
      .doc(placeId)
      .collection('comments')
      .doc(commentId)
      .get();

    if (!commentRef.exists) {
      return NextResponse.json(
        { error: 'shared.api.error.notFound' },
        { status: 404 }
      );
    }

    await commentRef.ref.update({ comment, updatedAt: Date.now() });

    return NextResponse.json(commentRef.data(), {
      status: 200,
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return NextResponse.json(
      { error: 'shared.api.error.internalError' },
      { status: 500 }
    );
  }
}
