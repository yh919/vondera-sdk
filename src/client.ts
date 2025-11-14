import { AxiosInstance } from "axios";
import { createHttpClient } from "./http";
import { WishlistEndpoint } from "./endpoints/wishlist";
import { ProductsEndpoint } from "./endpoints/products";
import { CategoriesEndpoint } from "./endpoints/categories";
import { AuthEndpoint } from "./endpoints/auth";
import type { HttpOptions } from "./http";

/**
 * Client options
 */
export type ApiClientOptions = HttpOptions & {
  /**
   * Expose underlying axios instance for advanced use
   */
  exposeHttp?: boolean;
};

/**
 * ApiClient is the main entry point to call Vondera public APIs.
 *
 * Example:
 * const client = new ApiClient({ apiKey: '...', baseURL: 'https://api.vondera.app' });
 */
export class ApiClient {
  public http: AxiosInstance;
  public wishlist: WishlistEndpoint;
  public products: ProductsEndpoint;
  public categories: CategoriesEndpoint;
  public auth: AuthEndpoint;

  constructor(options: ApiClientOptions) {
    if (!options || !options.apiKey)
      throw new Error("ApiClient requires an apiKey");

    this.http = createHttpClient(options);

    this.wishlist = new WishlistEndpoint(this.http);
    this.products = new ProductsEndpoint(this.http);
    this.categories = new CategoriesEndpoint(this.http);
    this.auth = new AuthEndpoint(this.http);
  }
}

export default ApiClient;
