import type { Action } from '../actions/types';
import Proposal from '../models/Proposal';
import { LOAD_HOME_DATA } from '../actions/home';

export type State = {
  proposalsTodo: Proposal[],
};

const initialState = {
  proposalsTodo: [],
};

export default function (state: State = initialState, action: Action): State {
  if (action.type === LOAD_HOME_DATA) {
    return {
      ...state,
      proposalsTodo: action.proposalsTodo,
    };
  }

  return state;
}
