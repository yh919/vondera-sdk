import { AxiosInstance } from "axios";
import { ApiResponse, WishlistResponse } from "../types";

/**
 * Wishlist endpoints
 */
export class WishlistEndpoint {
  private http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Add product to wishlist
   * @param productId - product id
   */
  async add(productId: string): Promise<ApiResponse<null>> {
    const res = await this.http.post("/customer/wishlist", { productId });
    return res.data as ApiResponse<null>;
  }

  /**
   * Get wishlist
   * @param page - page number
   * @param limit - items per page
   */
  async get(page = 1, limit = 10): Promise<ApiResponse<WishlistResponse>> {
    const res = await this.http.get("/customer/wishlist", {
      params: { page, limit },
    });
    return res.data as ApiResponse<WishlistResponse>;
  }

  /**
   * Remove product from wishlist
   * @param productId - product id
   */
  async remove(productId: string): Promise<ApiResponse<null>> {
    const res = await this.http.delete("/customer/wishlist", {
      data: { productId },
    });
    return res.data as ApiResponse<null>;
  }
}
