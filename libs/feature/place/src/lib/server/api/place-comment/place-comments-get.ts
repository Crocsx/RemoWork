import * as Sentry from '@sentry/nextjs';
import { User } from 'firebase/auth';
import { firestore } from 'firebase-admin';
import { NextResponse } from 'next/server';

import { readQueryString } from '~workspace/lib/shared/utils';

import {
  PlaceComment,
  PlaceCommentsGetRequest,
  PlaceCommentsGetResponse,
} from '../../../shared';

export async function placeCommentsGet(req: Request, placeId: string) {
  try {
    const { searchParams } = new URL(req.url);
    const requestParams =
      readQueryString<PlaceCommentsGetRequest>(searchParams);
    const { fromDocId, sortBy, perPage = 20 } = requestParams;

    if (!placeId) {
      return NextResponse.json(
        { error: 'place.api.error.idRequired' },
        { status: 400 }
      );
    }

    let query: firestore.Query<firestore.DocumentData> = firestore()
      .collection('places')
      .doc(placeId)
      .collection('comments');
    if (sortBy?.field) {
      query = query.orderBy(
        sortBy.field,
        sortBy.dir === 'desc' ? 'desc' : 'asc'
      );
    }
    if (fromDocId) {
      const lastDoc = await firestore()
        .collection('places')
        .doc(fromDocId)
        .get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    query = query.limit(perPage);
    const querySnapshot = await query.get();

    const userIds = new Set<string>();
    const comments: PlaceComment[] = querySnapshot.docs.map((doc) => {
      const comment = doc.data() as PlaceComment;
      userIds.add(comment.createdBy);
      return comment;
    });

    const users = await fetchUserDataBatch(Array.from(userIds));

    const commentsWithUserData = comments.map((comment) => {
      return {
        ...comment,
        user: users[comment.createdBy],
      };
    });

    return NextResponse.json<PlaceCommentsGetResponse>(commentsWithUserData, {
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

async function fetchUserDataBatch(userIds: string[]) {
  const users: Record<string, User> = {};
  for (const userId of userIds) {
    const userDoc = await firestore().collection('users').doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data() as User;
      users[userId] = userData;
    }
  }
  return users;
}
