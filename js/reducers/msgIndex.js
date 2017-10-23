import type { Action } from '../actions/types';
import Msg from '../models/Msg';
import { LOAD_MORE_MSGS, REFRESH_MSGS } from '../actions/msgIndex';
import { push, unshift } from '../commons/util';

export type State = {
  minUpdate: number,
  maxUpdate: number,
  msgs: Msg[],
}

const initialState = {
  minUpdate: 0,
  maxUpdate: 0,
  msgs: [],
};

export default function (state: State = initialState, action: Action): Msg[] {
  if (action.type === REFRESH_MSGS) {
    return {
      ...state,
      maxUpdate: action.maxUpdate,
      minUpdate: state.minUpdate === 0 ? action.minUpdate : state.minUpdate,
      msgs: unshift(state.msgs, action.msgs),
    };
  }

  if (action.type === LOAD_MORE_MSGS) {
    return {
      ...state,
      minUpdate: action.minUpdate,
      msgs: push(state.msgs, action.msgs),
    };
  }

  return state;
}
