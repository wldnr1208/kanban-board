import { api } from "./axios-instance";
import { LoginRequest, RegisterRequest, AuthResponse } from "../../app/types";

export const authApi = {
  login: (data: LoginRequest) =>
    api.post<AuthResponse>("/api/auth/login", data),

  register: (data: RegisterRequest) =>
    api.post<AuthResponse>("/api/auth/register", data),

  kakaoLogin: (code: string) =>
    api.get<AuthResponse>("/api/auth/kakao/callback", { params: { code } }),
};
