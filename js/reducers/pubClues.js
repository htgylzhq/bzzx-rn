import type { Action } from '../actions/types';
import { LOAD_MORE_PUB_CLUES, REFRESH_PUB_CLUES } from '../actions/pubClues';
import { push } from '../commons/util';

export type State = {
  minUpdate: number,
  maxUpdate: number,
  clues: Object[],
}

const initialState = {
  minUpdate: 0,
  maxUpdate: 0,
  clues: [],
};

export default function (state: State = initialState, action: Action): State {
  if (action.type === REFRESH_PUB_CLUES) {
    return {
      ...state,
      maxUpdate: action.maxUpdate,
      minUpdate: state.minUpdate === 0 ? action.minUpdate : state.minUpdate,
      clues: action.clues,
    };
  }

  if (action.type === LOAD_MORE_PUB_CLUES) {
    return {
      ...state,
      minUpdate: action.minUpdate,
      clues: push(state.clues, action.clues),
    };
  }

  return state;
}
