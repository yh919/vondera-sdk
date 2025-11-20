import { AxiosInstance } from "axios";
import { ApiResponse, CartResponse } from "../types";

export class CartEndpoint {
  private http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async get(userId: string): Promise<ApiResponse<CartResponse>> {
    const res = await this.http.get("/cart", { headers: { userid: userId } });
    return res.data as ApiResponse<CartResponse>;
  }

  async add(
    payload: Record<string, any>,
    userId: string
  ): Promise<ApiResponse<CartResponse>> {
    const res = await this.http.post("/cart", payload, {
      headers: { userid: userId },
    });
    return res.data as ApiResponse<CartResponse>;
  }

  async update(
    payload: Record<string, any>,
    userId: string
  ): Promise<ApiResponse<CartResponse>> {
    const res = await this.http.put("/cart", payload, {
      headers: { userid: userId },
    });
    return res.data as ApiResponse<CartResponse>;
  }

  async remove(
    payload: Record<string, any>,
    userId: string
  ): Promise<ApiResponse<CartResponse>> {
    const res = await this.http.delete("/cart", {
      data: payload,
      headers: { userid: userId },
    });
    return res.data as ApiResponse<CartResponse>;
  }

  async clear(userId: string): Promise<ApiResponse<CartResponse>> {
    const res = await this.http.delete("/cart/clear", {
      headers: { userid: userId },
    });
    return res.data as ApiResponse<CartResponse>;
  }
}
