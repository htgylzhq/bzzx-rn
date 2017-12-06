
import type { Action } from '../actions/types';
import { ON_FETCH_COMMENT, ON_LOAD_MORE_COMMENT } from '../actions/comment';
import { push } from '../commons/util';

export type State = {
  comment: Array,
  pageNo: number,
  total: number,
}

const initialState = {
  comment: [],
  pageNo: 1,
  total: 0,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === ON_FETCH_COMMENT) {
    return {
      ...state,
      comment: action.comment,
      pageNo: action.pageNo,
      total: action.total,
    };
  }
  if (action.type === ON_LOAD_MORE_COMMENT) {
    return {
      ...state,
      comment: push(state.comment, action.comment),
      pageNo: action.pageNo,
      total: action.total,
    };
  }
  return state;
}
