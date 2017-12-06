import User from '../models/User';
import Msg from '../models/Msg';
import Comment from '../models/Comment';
import Proposal from '../models/Proposal';
import ProposalLog from '../models/ProposalLog';
import { LOAD_MORE_PUB_CLUES, REFRESH_PUB_CLUES } from '../actions/pubClues';
import { ON_FETCH_CLUE_INFO } from './clueDetail';
import { ON_FETCH_CLUE_COMMENTS, ON_LOAD_MORE_CLUE_COMMENTS } from './clueComments';

export type Action =
  { type: 'PUSH_NEW_ROUTE', route: string }
  | { type: 'POP_ROUTE' }
  | { type: 'POP_TO_ROUTE', route: string }
  | { type: 'REPLACE_ROUTE', route: string }
  | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'SET_USER', name: string }
  | { type: 'SET_LIST', list: string }
  | { type: 'LOGIN', user: User, sid: string }
  | { type: 'REFRESH_MSGS', msgs: Msg[], maxUpdate: number, minUpdate: number }
  | { type: 'LOAD_MORE_MSGS', msgs: Msg[], maxUpdate: number, minUpdate: number }
  | { type: 'ON_FETCH_MSG', msg: Msg }
  | { type: 'LOAD_MORE_MSG_COMMENTS', comments: Comment[], maxUpdate: number }
  | { type: 'REFRESH_PROPOSALS', proposals: Proposal[], maxUpdate: number, minUpdate: number }
  | { type: 'LOAD_MORE_PROPOSALS', proposals: Proposal[], maxUpdate: number, minUpdate: number }
  | { type: 'ON_FETCH_PROPOSAL', proposal: Proposal }
  | { type: 'LOAD_MORE_PROPOSAL_COMMENTS', comments: Comment[], maxUpdate: number }
  | { type: 'REFRESH_MY_OWN_PROPOSALS', proposals: Proposal[], maxUpdate: number, minUpdate: number }
  | { type: 'LOAD_MORE_MY_OWN_PROPOSALS', proposals: Proposal[], maxUpdate: number, minUpdate: number }
  | { type: 'REFRESH_MY_TODO_PROPOSALS', proposals: Proposal[], maxUpdate: number, minUpdate: number }
  | { type: 'LOAD_MORE_MY_TODO_PROPOSALS', proposals: Proposal[], maxUpdate: number, minUpdate: number }
  | { type: 'REFRESH_MY_DONE_PROPOSALS', proposals: Proposal[], maxUpdate: number, minUpdate: number }
  | { type: 'LOAD_MORE_MY_DONE_PROPOSALS', proposals: Proposal[], maxUpdate: number, minUpdate: number }
  | { type: 'LOAD_HOME_DATA', proposalsTodo: Proposal[], proposalsMy: Proposal[] }
  | { type: 'ON_FETCH_PROPOSAL_INFO', proposal: Proposal }
  | { type: 'REEDIT_ON_FETCH_PROPOSAL_INFO', proposal: Proposal }
  | { type: 'ON_FETCH_PROPOSAL_LOGS', proposalLogs: ProposalLog[] }
  | { type: 'ON_FETCH_CONTACTS', contacts: Object }
  | { type: 'ON_FETCH_UNDERTAKERS', undertakers: Object[] }
  | { type: REFRESH_PUB_CLUES, clues: Object[] }
  | { type: LOAD_MORE_PUB_CLUES, clues: Object[] }
  | { type: ON_FETCH_CLUE_INFO, clue: Object}
  | { type: ON_FETCH_CLUE_COMMENTS, comments: Object[], pageNo: number, total: number }
  | { type: ON_LOAD_MORE_CLUE_COMMENTS, comments: Object[], pageNo: number, total: number }
  ;

export type Dispatch = (action: Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
