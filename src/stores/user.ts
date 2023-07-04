import { createSlice } from "@reduxjs/toolkit";

interface IUserState {
  username: string;
  nickname: string;
}

const initialState: IUserState = {
  username: "",
  nickname: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}
});
