import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8088'

axios.defaults.timeout = 20000;

// 设置请求头部信息
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

// 在请求发送前，可以做一些数据处理的操作，比如设置 token 等
axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 在响应返回后，可以做一些数据处理的操作，比如统一处理错误信息等
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // 统一处理错误信息
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    location.reload();
  }
  return Promise.reject(error);
});


export default axios;