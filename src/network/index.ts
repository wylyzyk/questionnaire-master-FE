import axios from "axios";
import { message } from "antd";

const http = axios.create({
  timeout: 5 * 1000
});

http.interceptors.response.use((response) => {
  const res = (response.data || {}) as ResponseType;
  const { errno, data = {}, msg = "" } = res;

  if (errno !== 0) {
    msg && message.error("msg");
    throw new Error(msg);
  }

  return data as any;
});

export default http;

export interface ResponseType {
  errno: number;
  data?: ResDataType;
  msg?: string;
}

export interface ResDataType {
  [key: string]: any;
}
