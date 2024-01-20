import { PlaceComment } from '../place';

export type PlaceCommentAddRequest = { comment: string };
export type PlaceCommentAddResponse = PlaceComment;

export type PlaceCommentDeleteRequest = void;
export type PlaceCommentDeleteResponse = { success: boolean };

export type PlaceCommentGetRequest = void;
export type PlaceCommentGetResponse = PlaceComment;

export type PlaceCommentUpdateRequest = { comment: string };
export type PlaceCommentUpdateResponse = PlaceComment;

export type PlaceCommentsGetResponse = PlaceComment[];
export type PlaceCommentsGetRequest = {
  sortBy?: {
    field: 'createdAt' | 'updatedAt';
    dir?: 'asc' | 'desc';
  };
  fromDocId?: string;
  perPage?: number;
};
