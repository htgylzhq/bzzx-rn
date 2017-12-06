import type { Action } from '../actions/types';
import Proposal from '../models/Proposal';
import {
  REEDIT_ON_FETCH_PROPOSAL_INFO,
} from '../actions/reedit';

export type State = {
  proposal: Proposal,
}

const initialState = {
  proposal: new Proposal(),
};

export default function (state: State = initialState, action: Action): Proposal[] {
  if (action.type === REEDIT_ON_FETCH_PROPOSAL_INFO) {
    return {
      ...state,
      proposal: action.proposal,
    };
  }


  return state;
}
