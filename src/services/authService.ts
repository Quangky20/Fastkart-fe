import axios from "./axiosClient";
import type { LoginForm, LoginRes, LogoutRes, UserRes } from "../types/auth";

export const AuthService = {
  async signin(data: LoginForm): Promise<LoginRes> {
    const res = await axios.post<LoginRes>("auth/signin", data);
    return res.data;
  },

  async signout(): Promise<LogoutRes> {
    const res = await axios.post<LogoutRes>("auth/signout");
    return res.data;
  },

  async getMe(): Promise<UserRes> {
    const res = await axios.get<UserRes>("auth/me");
    return res.data;
  },
};
