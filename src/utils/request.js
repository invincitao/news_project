import axios from 'axios'

axios.defaults.baseURL = 'http://157.122.54.189:9083'

import { Toast } from 'vant'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem('mytoken');
  if (token) {
    config.headers.Authorization = localStorage.getItem('mytoken');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.message == '用户信息验证失败!' || response.data.message == '用户信息验证失败') {
    Toast('用户信息验证失败');
    // console.log('网页为', window.location.href);
    window.location.href = '#/login?redirect_id=' + window.location.href;
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default axios