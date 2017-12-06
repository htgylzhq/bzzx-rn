import type { Action } from './types';

export const ON_FETCH_COMMENT = 'ON_FETCH_COMMENT';
export const ON_LOAD_MORE_COMMENT = 'ON_LOAD_MORE_COMMENT';

export function onFetchComment(comment: [], pageNo: number, total: number): Action {
  return {
    type: ON_FETCH_COMMENT,
    comment,
    pageNo,
    total,
  };
}
export function onLoadMoreComment(comment: [], pageNo: number, total: number): Action {
  return {
    type: ON_LOAD_MORE_COMMENT,
    comment,
    pageNo,
    total,
  };
}
