import axios from 'axios';

const http = axios.create({
  baseURL: 'http://bzzx.tengri.cc',
  timeout: 20000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default http;
