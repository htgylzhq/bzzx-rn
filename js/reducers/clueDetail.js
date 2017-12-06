import type { Action } from '../actions/types';
import { ON_FETCH_CLUE_INFO, } from '../actions/clueDetail';

export type State = {
  clue: Object,
}

const initialState = {
  clue: {},
};

export default function (state: State = initialState, action: Action): State {
  if (action.type === ON_FETCH_CLUE_INFO) {
    return {
      ...state,
      clue: action.clue,
    };
  }

  return state;
}
