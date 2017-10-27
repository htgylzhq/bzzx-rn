import type { Action } from './types';
import Proposal from '../models/Proposal';
import Comment from '../models/Comment';

export const ON_FETCH_PROPOSAL = 'ON_FETCH_PROPOSAL';
export const LOAD_MORE_PROPOSAL_COMMENTS = 'LOAD_MORE_PROPOSAL_COMMENTS';


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
