import axios from "axios";
import { ElMessage } from "element-plus"; // 示例使用 Element Plus 提示组件

// 创建实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 从 .env 文件读取
  timeout: 10000, // 超时时间
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// ----- 请求拦截器 -----
// instance.interceptors.request.use(
//   (config) => {
//     // 添加认证 Token
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // 特殊 Content-Type 处理（如文件上传）
//     if (config.headers["Content-Type"] === "multipart/form-data") {
//       delete config.headers["Content-Type"]; // 浏览器会自动设置
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// ----- 响应拦截器 -----
instance.interceptors.response.use(
  (response) => {
    // 统一处理业务逻辑错误（根据后端约定）
    const res = response.data;
    if (res.code !== 200) {
      // 假设 code 200 表示成功
      ElMessage.error(res.message || "业务错误");
      return Promise.reject(new Error(res.message || "Error"));
    }
    return res;
  },
  (error) => {
    // 处理 HTTP 错误状态码
    let message = "";
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = "身份过期，请重新登录";
          localStorage.removeItem("token");
          window.location.href = "/login"; // 跳转登录
          break;
        case 403:
          message = "拒绝访问";
          break;
        case 404:
          message = "资源不存在";
          break;
        case 500:
          message = "服务器错误";
          break;
        default:
          message = `连接错误 ${error.response.status}`;
      }
    } else if (error.request) {
      message = "网络连接超时";
    } else {
      message = error.message;
    }
    ElMessage.error(message);
    return Promise.reject(error);
  }
);

export default instance;
