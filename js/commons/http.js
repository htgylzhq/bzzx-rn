import axios from 'axios';
import qs from 'qs';
import { Toaster } from './util';
import _global from './global';

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  error => Promise.resolve(error.response)
);

function checkStatus(response) {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data;
  }
  // 异常状态下，把错误信息返回去
  return {
    code: -1,
    msg: '网络异常',
  };
}

function checkCode(res) {
  if (res.msg === '登录失效') {
    Toaster.error(res.msg);
    _global.logout();
  }
  if (res.code !== 0) {
    Toaster.error(res.msg);
  }
  return res;
}

const baseURL = 'http://bzzx.tengri.cc';

export default {
  post(url, data) {
    return axios({
      method: 'post',
      baseURL,
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }).then(
      response => checkStatus(response)
    ).then(
      res => checkCode(res)
    );
  },
  get(url, params) {
    return axios({
      method: 'get',
      baseURL,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    }).then(
      response => checkStatus(response)
    ).then(
      res => checkCode(res)
    );
  },
};

