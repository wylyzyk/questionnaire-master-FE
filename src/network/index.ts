/**
 * @description: axios 封装
 * 请求流程:
 *    1. 调用请求函数
 *    2. 请求参数处理
 *    3. [请求拦截]
 *      - 修改请求头
 *      - 配置用户标识
 *    4. 发起请求
 *    5. [响应拦截]
 *      - 网络错误处理
 *      - 授权错误处理
 *      - 普通错误处理
 *      - 请求完成
 *    6. 返回参数处理
 */

import axios from "axios";
import { message } from "antd";
import { getItem } from "../utils/storage.ts";
import { AUTH_TOKEN } from "../constants";

const http = axios.create({
  baseURL: "/api",
  timeout: 5 * 1000
});

const handleNetworkError = (errStatus: number) => {
  let errMessage: string;
  if (errStatus) {
    switch (errStatus) {
      case 400:
        errMessage = "错误的请求, 请检查 url";
        break;
      case 401:
        errMessage = "未授权，请重新登录";
        break;
      case 403:
        errMessage = "拒绝访问";
        break;
      case 404:
        errMessage = "请求错误,未找到该资源";
        break;
      case 405:
        errMessage = "请求方法未允许";
        break;
      case 408:
        errMessage = "请求超时";
        break;
      case 500:
        errMessage = "服务器端出错";
        break;
      case 501:
        errMessage = "网络未实现";
        break;
      case 502:
        errMessage = "网络错误";
        break;
      case 503:
        errMessage = "服务不可用";
        break;
      case 504:
        errMessage = "网络超时";
        break;
      case 505:
        errMessage = "http版本不支持该请求";
        break;
      default:
        errMessage = `其他连接错误 --${errStatus}`;
    }
  } else {
    errMessage = `无法连接到服务器！`;
  }
  message.error(errMessage);
};

const handleAuthError = (errno: number) => {
  const authErrMap: any = {
    "10031": "登录失效，需要重新登录", // token 失效
    "10032": "您太久没登录，请重新登录~", // token 过期
    "10033": "账户未绑定角色，请联系管理员绑定角色",
    "10034": "该用户未注册，请联系管理员注册用户",
    "10035": "code 无法获取对应第三方平台用户",
    "10036": "该账户未关联员工，请联系管理员做关联",
    "10037": "账号已无效",
    "10038": "账号未找到"
  };

  if (authErrMap.hasOwnProperty(errno)) {
    message.error(authErrMap[errno]);
    // TODO: 授权错误，登出账户
    return authErrMap[errno];
  }
};

http.interceptors.request.use(
  (config) => {
    const token = getItem(AUTH_TOKEN);
    // 修改请求头
    config.headers["Content-Type"] = "application/json";
    // 配置用户标识
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    if (error.response.code === 401) {
      // logout
      return Promise.reject(new Error("请重新登录"));
    }
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      return Promise.reject(response.data);
    }
    const res = (response.data || {}) as ResponseType;
    const { errno, data = {}, msg = "" } = res;

    // 授权错误处理
    const authErr = handleAuthError(errno);
    if (authErr) {
      // TODO: logout
      return Promise.reject(new Error(authErr));
    }

    // 普通错误处理
    if (errno !== 0) {
      msg && message.error(msg);
      return Promise.reject(new Error(msg));
    }
    return data as any;
  },
  (error) => {
    // 网络错误处理
    handleNetworkError(error.response.status);
    return Promise.reject(new Error(error));
  }
);

export default http;

// export const network = {
//   get: (...opts: Parameters<typeof http.get>): Promise<ResDataType> => http.get(...opts),
//   post: (...opts: Parameters<typeof http.post>) => http.post(...opts),
//   put: (...opts: Parameters<typeof http.put>) => http.put(...opts),
//   delete: (...opts: Parameters<typeof http.delete>) => http.delete(...opts),
//   patch: (...opts: Parameters<typeof http.patch>) => http.patch(...opts)
// };

export interface ResponseType {
  errno: number;
  data?: ResDataType;
  msg?: string;
}

export interface ResDataType {
  [key: string]: any;
}
