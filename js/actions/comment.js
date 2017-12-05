import type { Action } from './types';

export const ON_FETCH_COMMENT = 'ON_FETCH_COMMENT';

export function onFetchComment(comment: Array): Action {
  return {
    type: ON_FETCH_COMMENT,
    comment,
  };
}
