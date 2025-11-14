import { AxiosInstance } from "axios";
import {
  ApiResponse,
  ProductListResponse,
  ProductDetailResponse,
} from "../types";

export class ProductsEndpoint {
  private http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(
    params?: Record<string, any>
  ): Promise<ApiResponse<ProductListResponse>> {
    const res = await this.http.get("/products", { params });
    return res.data as ApiResponse<ProductListResponse>;
  }

  async getById(id: string): Promise<ApiResponse<ProductDetailResponse>> {
    const res = await this.http.get(`/products/single/${id}`);
    return res.data as ApiResponse<ProductDetailResponse>;
  }

  async featured(): Promise<ApiResponse<any>> {
    const res = await this.http.get("/products/featured");
    return res.data as ApiResponse<any>;
  }

  async reviews(
    productId: string,
    page = 1,
    limit = 5
  ): Promise<ApiResponse<any>> {
    const res = await this.http.get(`/products/${productId}/review`, {
      params: { pageNo: page, limit },
    });
    return res.data as ApiResponse<any>;
  }

  async addReview(
    productId: string,
    payload: { rating: number; review: string; email: string; name: string }
  ) {
    const res = await this.http.post(`/products/${productId}/review`, payload);
    return res.data as ApiResponse<any>;
  }
}
