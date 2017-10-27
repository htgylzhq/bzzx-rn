import type { Action } from '../actions/types';
import Proposal from '../models/Proposal';
import { LOAD_MORE_PROPOSALS, REFRESH_PROPOSALS } from '../actions/proposalIndex';
import { push, unshift } from '../commons/util';

export type State = {
  minUpdate: number,
  maxUpdate: number,
  proposals: Proposal[],
}

const initialState = {
  minUpdate: 0,
  maxUpdate: 0,
  proposals: [],
};

export default function (state: State = initialState, action: Action): Proposal[] {
  if (action.type === REFRESH_PROPOSALS) {
    return {
      ...state,
      maxUpdate: action.maxUpdate,
      minUpdate: state.minUpdate === 0 ? action.minUpdate : state.minUpdate,
      proposals: unshift(state.proposals, action.proposals),
    };
  }

  if (action.type === LOAD_MORE_PROPOSALS) {
    return {
      ...state,
      minUpdate: action.minUpdate,
      proposals: push(state.proposals, action.proposals),
    };
  }

  return state;
}
