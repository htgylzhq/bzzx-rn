import axios from 'axios';
import qs from 'qs';

const http = axios.create({
  baseURL: 'http://cjzzx.tengri.cc',
  timeout: 20000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest(data) {
    return qs.stringify(data);
  },
});

export default http;
