import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

/**
 * Options for creating the HTTP client
 */
export type HttpOptions = {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
};

/**
 * Create a configured Axios instance with interceptors and unified error handling.
 * The instance automatically attaches `x-api-key` header to every request.
 *
 * @param options - HttpOptions
 * @returns AxiosInstance
 */
export function createHttpClient(options: HttpOptions): AxiosInstance {
  const instance = axios.create({
    baseURL: options.baseURL || process.env.VONDERA_API_BASE || "",
    timeout: options.timeout ?? 15000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor: attach API key
  instance.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    config.headers["x-api-key"] = options.apiKey;
    return config;
  });

  // Response interceptor: return data directly and unify errors
  instance.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
      // Normalize error
      const err = {
        name: "AxiosError",
        message: "",
        isAxios: true as true,
        status: undefined as number | undefined,
        data: undefined as any,
      };
      if (error.response) {
        err.status = error.response.status;
        err.data = error.response.data;
        err.message = (error.response.data as any)?.message || error.message;
      } else if (error.request) {
        err.message = "No response received from server";
      } else {
        err.message = error.message;
      }
      return Promise.reject(err);
    }
  );

  return instance;
}
