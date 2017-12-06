import type { Action } from '../actions/types';
import { ON_FETCH_CLUE_COMMENTS, ON_LOAD_MORE_CLUE_COMMENTS } from '../actions/clueComments';
import { push } from '../commons/util';

export type State = {
  comments: Array,
  pageNo: number,
  total: number,
}

const initialState = {
  comments: [],
  pageNo: 1,
  total: 0,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === ON_FETCH_CLUE_COMMENTS) {
    return {
      ...state,
      comments: action.comments,
      pageNo: action.pageNo,
      total: action.total,
    };
  }
  if (action.type === ON_LOAD_MORE_CLUE_COMMENTS) {
    return {
      ...state,
      comments: push(state.comments, action.comments),
      pageNo: action.pageNo,
      total: action.total,
    };
  }
  return state;
}
