import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { NextResponse } from 'next/server';

import { PlaceCommentAddRequest } from '../../../shared';

export async function placeCommentAdd(
  req: Request,
  placeId: string,
  { userId }: { userId: string }
) {
  try {
    const { comment }: PlaceCommentAddRequest = await req.json();

    if (!placeId) {
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
      .add({
        comment,
        createdBy: userId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

    await firestore()
      .collection('junction_userId_commentId')
      .doc(placeId)
      .collection('comments')
      .add({
        commentId: commentRef.id,
        userId: userId,
      });

    return NextResponse.json(commentRef, {
      status: 201,
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
