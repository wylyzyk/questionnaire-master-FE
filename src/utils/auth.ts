import { removeAllItem, setItem } from "./storage.ts";
import { AUTH_TOKEN } from "../constants";
import { getUserInfoService, loginService, registerService } from "../network/user.ts";

export interface IUser {
  username: string;
  token: string;
}

const handleUserResponse = (user: IUser) => {
  setItem(AUTH_TOKEN, user.token || "");
};

export const login = async ({ username, password }: { username: string; password: string }) => {
  try {
    const data = await loginService(username, password);
    handleUserResponse(data as IUser);
  } catch (err: unknown) {
    return Promise.reject(err);
  }
};

export const register = async ({ username, password }: { username: string; password: string }) => {
  try {
    const data = await registerService(username, password);
    handleUserResponse(data as IUser);
  } catch (err: unknown) {
    return Promise.reject(err);
  }
};

export const getUserInfo = async () => {
  try {
    const data = await getUserInfoService();
    return data;
  } catch (err: unknown) {
    return Promise.reject(err);
  }
};

export const logout = () => {
  removeAllItem();
};
