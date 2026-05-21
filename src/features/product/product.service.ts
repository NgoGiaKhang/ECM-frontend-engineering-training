import { api } from "../../api/api";
import { type ApiResponse, type PaginatedResponse } from "../../api/types";
import type { Product } from "./types";

class ProductService {
  async findById(id: string | undefined, signal: AbortSignal): Promise<Product> {
    const res = await api.get<ApiResponse<Product>>(`/products/${id}`, {signal})
    return res.data;
  }
  async findAll(page: number, limit: number, signal: AbortSignal) {
    return api.get<PaginatedResponse<Product>>("/products", {
      signal,
      params: {
        limit,
        page,
      },
    });
  }
}

export const productService = new ProductService();
