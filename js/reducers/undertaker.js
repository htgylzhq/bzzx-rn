import type { Action } from '../actions/types';
import { ON_FETCH_UNDERTAKERS } from '../actions/undertaker';

export type State = {
  undertakers: []
}

const initialState = {
  undertakers: [],
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === ON_FETCH_UNDERTAKERS) {
    return {
      ...state,
      undertakers: action.undertakers,
    };
  }
  return state;
}
