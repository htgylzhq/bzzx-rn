import type { Action } from '../actions/types';
import Proposal from '../models/Proposal';
import Comment from '../models/Comment';
import { LOAD_MORE_PROPOSAL_COMMENTS, ON_FETCH_PROPOSAL } from '../actions/proposalDetail';
import { push } from '../commons/util';

export type State = {
  proposal: Proposal,
  comments: Comment[],
  maxUpdate: number,
}

const initialState = {
  proposal: undefined,
  comments: [],
  maxUpdate: 0,
};

export default function (state: State = initialState, action: Action): Proposal[] {
  if (action.type === ON_FETCH_PROPOSAL) {
    return {
      proposal: action.proposal,
      maxUpdate: action.maxUpdate,
      comments: action.comments,
    };
  }

  if (action.type === LOAD_MORE_PROPOSAL_COMMENTS) {
    return {
      ...state,
      maxUpdate: action.maxUpdate,
      comments: push(state.comments, action.comments),
    };
  }

  return state;
}
