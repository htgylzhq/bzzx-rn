import type { Action } from './types';

export const ON_FETCH_CLUE_COMMENTS = 'ON_FETCH_CLUE_COMMENTS';
export const ON_LOAD_MORE_CLUE_COMMENTS = 'ON_LOAD_MORE_CLUE_COMMENTS';

export function onFetchClueComments(comments: [], pageNo: number, total: number): Action {
  return {
    type: ON_FETCH_CLUE_COMMENTS,
    comments,
    pageNo,
    total,
  };
}
export function onLoadMoreClueComments(comments: [], pageNo: number, total: number): Action {
  return {
    type: ON_LOAD_MORE_CLUE_COMMENTS,
    comments,
    pageNo,
    total,
  };
}
