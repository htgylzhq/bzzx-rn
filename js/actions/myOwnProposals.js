import type { Action } from './types';
import Proposal from '../models/Proposal';

export const REFRESH_MY_OWN_PROPOSALS = 'REFRESH_MY_OWN_PROPOSALS';
export const LOAD_MORE_MY_OWN_PROPOSALS = 'LOAD_MORE_MY_OWN_PROPOSALS';

export function refresh(proposals: Proposal[], minUpdate: number, maxUpdate: number): Action {
  return {
    type: REFRESH_MY_OWN_PROPOSALS,
    proposals,
    minUpdate,
    maxUpdate,
  };
}

export function loadMore(proposals: Proposal[], minUpdate: number, maxUpdate: number): Action {
  return {
    type: LOAD_MORE_MY_OWN_PROPOSALS,
    proposals,
    minUpdate,
    maxUpdate,
  };
}
