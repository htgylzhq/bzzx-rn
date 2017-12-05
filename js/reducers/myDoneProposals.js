import type { Action } from '../actions/types';
import Proposal from '../models/Proposal';
import { LOAD_MORE_MY_DONE_PROPOSALS, REFRESH_MY_DONE_PROPOSALS } from '../actions/myDoneProposals';
import { push } from '../commons/util';

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
  if (action.type === REFRESH_MY_DONE_PROPOSALS) {
    return {
      ...state,
      maxUpdate: action.maxUpdate,
      minUpdate: state.minUpdate === 0 ? action.minUpdate : state.minUpdate,
      proposals: action.proposals,
    };
  }

  if (action.type === LOAD_MORE_MY_DONE_PROPOSALS) {
    return {
      ...state,
      minUpdate: action.minUpdate,
      proposals: push(state.proposals, action.proposals),
    };
  }

  return state;
}
