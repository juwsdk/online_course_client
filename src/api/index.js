import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080/courseproj/server",
  timeout: 20000,
  responseType: "json",
  // withCredentials: true,
});
//请求拦截器
request.interceptors.request.use(
  (config) => {
    const token=localStorage.getItem("token");
    if (token)
      config.headers.Authorization= `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 在响应返回后，可以做一些数据处理的操作，比如统一处理错误信息等
request.interceptors.response.use(
  response=>{
    const contentType = response.headers["content-type"];
    if (
      contentType &&
      (contentType.startsWith("application/octet-stream") ||
        contentType.startsWith("application/x-binary"))
    ) {
      // 处理二进制数据
      return response;
    }
    // 返回响应数据
    return response.data;
  },
  error => {
    // 统一处理错误信息
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      location.reload();
    }
    return Promise.reject(error);
  }
);
export default request

