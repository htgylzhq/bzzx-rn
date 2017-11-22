import type { Action } from './types';
import Proposal from '../models/Proposal';

export const LOAD_HOME_DATA = 'LOAD_HOME_DATA';

export default function onHomeDataLoaded(proposalsTodo: Proposal[], proposalsMy: Proposal[]): Action {
  return {
    type: LOAD_HOME_DATA,
    proposalsTodo,
    proposalsMy,
  };
}
