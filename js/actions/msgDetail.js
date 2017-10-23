import type { Action } from './types';
import Msg from '../models/Msg';
import Comment from '../models/Comment';

export const ON_FETCH_MSG = 'ON_FETCH_MSG';
export const LOAD_MORE_MSG_COMMENTS = 'LOAD_MORE_MSG_COMMENTS';


export function onFetchMsg(msg: Msg, comments: Comment[], maxUpdate:number): Action {
  return {
    type: ON_FETCH_MSG,
    msg,
    comments,
    maxUpdate,
  };
}

export function loadMore(comments: Comment[], maxUpdate:number):Action {
  return {
    type: LOAD_MORE_MSG_COMMENTS,
    comments,
    maxUpdate,
  };
}
