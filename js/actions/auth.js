import type { Action } from './types';
import User from '../models/User';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(user:User, sid:string):Action {
  return {
    type: LOGIN,
    user,
    sid,
  };
}

export function logout():Action {
  return {
    type: LOGOUT,
  };
}
