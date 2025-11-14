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

    // Ignore any user-provided baseURL: the SDK controls the base URL globally.
    if ((options as any).baseURL) {
      // Warn in development to help consumers migrate. Do not throw to remain
      // resilient for existing consumers, but the value will be ignored.
      // eslint-disable-next-line no-console
      console.warn(
        "'baseURL' option is ignored — the vondera-sdk uses a package-default base URL."
      );
    }

    this.http = createHttpClient({
      apiKey: options.apiKey,
      timeout: options.timeout,
    });

    this.wishlist = new WishlistEndpoint(this.http);
    this.products = new ProductsEndpoint(this.http);
    this.categories = new CategoriesEndpoint(this.http);
    this.auth = new AuthEndpoint(this.http);
  }
}

export default ApiClient;
