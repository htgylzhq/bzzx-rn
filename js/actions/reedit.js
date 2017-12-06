import type { Action } from './types';
import Proposal from '../models/Proposal';

export const REEDIT_ON_FETCH_PROPOSAL_INFO = 'REEDIT_ON_FETCH_PROPOSAL_INFO';

export function onFetchProposalInfo(proposal: Proposal): Action {
  console.log(REEDIT_ON_FETCH_PROPOSAL_INFO);
  return {
    type: REEDIT_ON_FETCH_PROPOSAL_INFO,
    proposal,
  };
}

