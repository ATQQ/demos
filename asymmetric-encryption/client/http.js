import axios from "axios";
import { publicEncrypt } from "./utils/crypto";
const http = axios;
http.defaults.baseURL = '/api'
http.defaults.headers = {
  "content-Type": "application/json"
};

http.interceptors.request.use(
  config => {
    // 发送之前操作config
    config.data = {
      value:publicEncrypt(JSON.stringify(config.data))
    }
    return config;
  },
  err => {
    // 处理错误
    return Promise.reject(err);
  }
);
http.interceptors.response.use(
  response => {
    // 返回前操作
    return response.data;
  },
  err => {
    return Promise.reject(err);
  }
);

export default http;