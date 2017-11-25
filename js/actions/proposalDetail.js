import type { Action } from './types';
import Proposal from '../models/Proposal';
import ProposalLog from '../models/ProposalLog';
import Comment from '../models/Comment';

export const ON_FETCH_PROPOSAL = 'ON_FETCH_PROPOSAL';
export const LOAD_MORE_PROPOSAL_COMMENTS = 'LOAD_MORE_PROPOSAL_COMMENTS';

export const ON_FETCH_PROPOSAL_INFO = 'ON_FETCH_PROPOSAL_INFO';
export const ON_FETCH_PROPOSAL_LOGS = 'ON_FETCH_PROPOSAL_LOGS';

export function onFetchProposal(proposal: Proposal, comments: Comment[], maxUpdate:number): Action {
  return {
    type: ON_FETCH_PROPOSAL,
    proposal,
    comments,
    maxUpdate,
  };
}

export function loadMore(comments: Comment[], maxUpdate:number):Action {
  return {
    type: LOAD_MORE_PROPOSAL_COMMENTS,
    comments,
    maxUpdate,
  };
}

export function onFetchProposalInfo(proposal: Proposal): Action {
  return {
    type: ON_FETCH_PROPOSAL_INFO,
    proposal,
  };
}

export function onFetchProposalLogs(proposalLogs: ProposalLog[]): Action {
  return {
    type: ON_FETCH_PROPOSAL_LOGS,
    proposalLogs,
  };
}
