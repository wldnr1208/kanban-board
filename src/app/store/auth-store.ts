// src/store/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthResponse } from "../types/auth";

interface AuthState {
  accessToken: string | null;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  setAuth: (auth: AuthResponse) => void;
  setUser: (user: AuthState["user"]) => void; // setUser 추가
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setAuth: (auth) =>
        set({
          accessToken: auth.accessToken,
          user: auth.user,
        }),
      setUser: (
        user // setUser 구현
      ) =>
        set({
          user,
        }),
      logout: () =>
        set({
          accessToken: null,
          user: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
