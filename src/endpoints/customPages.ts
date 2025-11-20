import { AxiosInstance } from "axios";
import { ApiResponse, CustomPage } from "../types";

export class CustomPagesEndpoint {
  private http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(): Promise<ApiResponse<CustomPage[]>> {
    const res = await this.http.get("/custom-pages");
    return res.data as ApiResponse<CustomPage[]>;
  }

  async getById(id: string): Promise<ApiResponse<CustomPage>> {
    const res = await this.http.get(`/custom-pages/${id}`);
    return res.data as ApiResponse<CustomPage>;
  }
}
