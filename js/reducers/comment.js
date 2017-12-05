
import type { Action } from '../actions/types';
import { ON_FETCH_COMMENT } from '../actions/comment';

export type State = {
  comment: Array,
}

const initialState = {
  comment: [],
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === ON_FETCH_COMMENT) {
    return {
      ...state,
      comment: state.comment,
    };
  }
  return state;
}
