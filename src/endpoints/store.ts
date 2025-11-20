import { AxiosInstance } from "axios";
import { ApiResponse, StoreData } from "../types";

export class StoreEndpoint {
  private http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Get store public data
   */
  async get(): Promise<ApiResponse<StoreData>> {
    const res = await this.http.get("/store/");
    return res.data as ApiResponse<StoreData>;
  }
}
