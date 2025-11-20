import { AxiosInstance } from "axios";
import {
  ApiResponse,
  OrdersResponse,
  OrderSummary,
  OrderPriceResponse,
  CreateOrderResponseData,
} from "../types";

export class OrdersEndpoint {
  private http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(pageNo = 1, limit = 10): Promise<ApiResponse<OrdersResponse>> {
    const res = await this.http.get("/customer/orders", {
      params: { pageNo, limit },
    });
    return res.data as ApiResponse<OrdersResponse>;
  }

  async getById(id: string): Promise<ApiResponse<OrderSummary>> {
    const res = await this.http.get(`/order/${id}`);
    return res.data as ApiResponse<OrderSummary>;
  }

  async calculatePrice(
    payload: Record<string, any>
  ): Promise<ApiResponse<OrderPriceResponse>> {
    const res = await this.http.post("/order/calculate", payload);
    return res.data as ApiResponse<OrderPriceResponse>;
  }

  async create(
    payload: Record<string, any>
  ): Promise<ApiResponse<CreateOrderResponseData>> {
    const res = await this.http.post("/order", payload);
    return res.data as ApiResponse<CreateOrderResponseData>;
  }
}
