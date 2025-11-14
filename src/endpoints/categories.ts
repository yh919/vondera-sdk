import { AxiosInstance } from "axios";
import { ApiResponse, Category } from "../types";

export class CategoriesEndpoint {
  private http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(): Promise<ApiResponse<Category[]>> {
    const res = await this.http.get("/category");
    return res.data as ApiResponse<Category[]>;
  }

  async getById(id: string): Promise<ApiResponse<Category>> {
    const res = await this.http.get(`/category/single/${id}`);
    return res.data as ApiResponse<Category>;
  }
}
