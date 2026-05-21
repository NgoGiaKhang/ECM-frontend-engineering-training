import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import type { ApiErrorResponse } from "./types";

class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.response.use(
      (res) => res,
      (error: AxiosError<ApiErrorResponse>) => {
        const status = error.response?.status;
        const data = error.response?.data;
        return Promise.reject({
          status: status ?? 0,
          message: data?.message ?? "Unknown error",
          code: data?.code ?? "UNKNOWN",
        });
      },
    );
  }

  // GET
  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.instance.get<T>(path, config);
    return res.data;
  }

  // POST
  async post<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await this.instance.post<T>(path, data, config);
    return res.data;
  }

  // PUT
  async put<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await this.instance.put<T>(path, data, config);
    return res.data;
  }

  // PATCH
  async patch<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await this.instance.patch<T>(path, data, config);
    return res.data;
  }

  // DELETE
  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.instance.delete<T>(path, config);
    return res.data;
  }
}

export const api = new HttpClient();
