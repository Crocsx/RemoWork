import * as Sentry from '@sentry/nextjs';
import { firestore } from 'firebase-admin';
import { NextResponse } from 'next/server';

export async function placeCommentDelete(
  req: Request,
  { params }: { params: { commentId: string; placeId: string } }
) {
  try {
    const placeId = params.placeId;
    const commentId = params.commentId;
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

    const commentDoc = await firestore()
      .collection('places')
      .doc(placeId)
      .collection('comments')
      .doc(commentId)
      .get();

    if (!commentDoc.exists) {
      return NextResponse.json(
        { error: 'shared.api.error.notFound' },
        { status: 404 }
      );
    }

    const junctionDoc = await firestore()
      .collection('junction_userId_commentId')
      .doc(`${commentDoc.id}_${commentId}`)
      .get();

    await commentDoc.ref.delete();
    await junctionDoc.ref.delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    return NextResponse.json(
      { error: 'shared.api.error.internalError' },
      { status: 500 }
    );
  }
}
