import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { User } from "./types";

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        login: (user, token) =>
          set({
            user,
            token,
            isAuthenticated: true,
          }),

        logout: () =>
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          }),
      }),
      {
        name: "auth-storage",
      },
    ),
    {
      name: "auth-store",
    },
  ),
);
