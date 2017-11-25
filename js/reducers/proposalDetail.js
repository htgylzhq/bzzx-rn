import type { Action } from '../actions/types';
import Proposal from '../models/Proposal';
import Comment from '../models/Comment';
import {
  LOAD_MORE_PROPOSAL_COMMENTS,
  ON_FETCH_PROPOSAL,
  ON_FETCH_PROPOSAL_INFO,
  ON_FETCH_PROPOSAL_LOGS,
} from '../actions/proposalDetail';
import { push } from '../commons/util';
import ProposalLog from '../models/ProposalLog';

export type State = {
  proposal: Proposal,
  proposalLogs: ProposalLog[],
  comments: Comment[],
  maxUpdate: number,
}

const initialState = {
  proposal: new Proposal(),
  proposalLogs: [],
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

  if (action.type === ON_FETCH_PROPOSAL_INFO) {
    return {
      ...state,
      proposal: action.proposal,
    };
  }

  if (action.type === ON_FETCH_PROPOSAL_LOGS) {
    return {
      ...state,
      proposalLogs: action.proposalLogs,
    };
  }

  return state;
}
