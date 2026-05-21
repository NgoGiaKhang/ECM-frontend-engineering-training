import { api } from "../../api/api";
import type { ApiResponse } from "../../api/types";
import type { LoginResponse } from "./types";

class AuthService {
  async login(email: string, password: string) {
    const response = await api.post<ApiResponse<LoginResponse>>("/login", {
      email,
      password,
    });
    return response.data;
  }
}

export const authService = new AuthService();
