import http, { ResDataType } from "./index.ts";

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  return await http.get("/user/info");
}

// 注册用户
export async function registerService(username: string, password: string): Promise<ResDataType> {
  return await http.post("/user/register", { username, password });
}

// login
export async function loginService(username: string, password: string): Promise<ResDataType> {
  return await http.post("/user/login", { username, password });
}
