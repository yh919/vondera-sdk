import { AxiosInstance } from "axios";
import { ApiResponse, LoginRequest, AuthResponseData } from "../types";

export class AuthEndpoint {
  private http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async login(payload: LoginRequest): Promise<ApiResponse<AuthResponseData>> {
    const res = await this.http.post("/customer/login", payload);
    return res.data as ApiResponse<AuthResponseData>;
  }

  async signup(
    payload: Record<string, any>
  ): Promise<ApiResponse<AuthResponseData>> {
    const res = await this.http.post("/customer/signup", payload);
    return res.data as ApiResponse<AuthResponseData>;
  }
}
