import { logout } from '../actions/auth';

const _BZZX_GLOBAL = {};

export default {
  setSid(sid: string) {
    _BZZX_GLOBAL.sid = sid;
  },
  getSid() {
    return _BZZX_GLOBAL.sid;
  },
  setNavigate(navigate:Function) {
    _BZZX_GLOBAL.navigate = navigate;
  },
  getNavigate() {
    return _BZZX_GLOBAL.navigate;
  },
  setDispatch(dispatch:Function) {
    _BZZX_GLOBAL.dispatch = dispatch;
  },
  logout() {
    _BZZX_GLOBAL.dispatch(logout());
  },
};
