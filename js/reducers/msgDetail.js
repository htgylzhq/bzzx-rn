import type { Action } from '../actions/types';
import Msg from '../models/Msg';
import Comment from '../models/Comment';
import { LOAD_MORE_MSG_COMMENTS, ON_FETCH_MSG } from '../actions/msgDetail';
import { push } from '../commons/util';

export type State = {
  msg: Msg,
  comments: Comment[],
  maxUpdate: number,
}

const initialState = {
  msg: undefined,
  comments: [],
  maxUpdate: 0,
};

export default function (state: State = initialState, action: Action): Msg[] {
  if (action.type === ON_FETCH_MSG) {
    return {
      msg: action.msg,
      maxUpdate: action.maxUpdate,
      comments: action.comments,
    };
  }

  if (action.type === LOAD_MORE_MSG_COMMENTS) {
    return {
      ...state,
      maxUpdate: action.maxUpdate,
      comments: push(state.comments, action.comments),
    };
  }

  return state;
}
